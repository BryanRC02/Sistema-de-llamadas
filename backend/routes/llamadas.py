from flask import Blueprint, request, jsonify, current_app
from models.llamada import Llamada
from models.asistente import Asistente
from models.rele import Rele
from services.notification import enviar_notificacion
from services.relay import activar_rele
from app import db
from datetime import datetime
import requests

llamadas_bp = Blueprint('llamadas', __name__)

def obtener_ip_rele(habitacion, cama):
    """
    Obtiene la IP del relé correspondiente a una habitación y cama desde la base de datos
    """
    rele = Rele.query.filter_by(habitacion=habitacion, cama=cama, activo=True).first()
    if rele:
        return rele.ip
    return None

@llamadas_bp.route('/llamada/<habitacion>/<cama>', methods=['GET'])
def registrar_llamada(habitacion, cama):
    """
    Registra una nueva llamada desde una habitación y cama específica
    """
    # Obtener la IP del relé correspondiente
    ip_rele = obtener_ip_rele(habitacion, cama)
    if not ip_rele:
        return jsonify({'error': 'No se encontró un relé activo para esta habitación y cama'}), 404

    # Crear nueva llamada
    nueva_llamada = Llamada(
        habitacion=habitacion,
        cama=cama,
        estado='pendiente',
        ip_rele=ip_rele
    )

    db.session.add(nueva_llamada)
    db.session.commit()

    # Preparar datos para la notificación
    url_atencion = f"{request.host_url.rstrip('/')}/atender/{nueva_llamada.id}"
    mensaje = f"Solicitud de asistencia en habitación {habitacion} y cama {cama}"
    titulo_url = "Atender solicitud de asistencia"

    # Enviar la notificación a todos los dispositivos registrados
    enviar_notificacion(mensaje, url_atencion, titulo_url)

    return jsonify({
        'status': 'success',
        'message': f'Llamada registrada correctamente para la habitación {habitacion}, cama {cama}',
        'llamada_id': nueva_llamada.id
    }), 201

@llamadas_bp.route('/atender/<int:llamada_id>', methods=['GET'])
def atender_llamada(llamada_id):
    """
    Procesa la atención de una llamada cuando un asistente hace click en el enlace de la notificación
    """
    # Obtener código de asistente de la cookie
    codigo_asistente = request.cookies.get('asistente')
    if not codigo_asistente:
        return jsonify({
            'status': 'error',
            'message': 'No estás autenticado como asistente'
        }), 400
    
    # Buscar asistente por código
    asistente = Asistente.query.filter_by(codigo=codigo_asistente).first()
    # Buscar llamada por ID
    llamada = Llamada.query.get(llamada_id)
    
    #  Si no existe el asistente o la llamada, devolver error
    if not asistente:
        return jsonify({
            'status': 'error',
            'message': 'Asistente no encontrado'
        }), 404
        
    if not llamada:
        return jsonify({
            'status': 'error',
            'message': 'Llamada no encontrada'
        }), 404
    
    # Verificar si la llamada ya está siendo atendida por otro asistente
    if llamada.estado != 'pendiente':
        return jsonify({
            'status': 'error',
            'message': f'Esta llamada ya está siendo atendida por otro asistente'
        }), 400
    
    # Actualizar el estado de la llamada a "atendida"
    llamada.estado = 'atendida'
    llamada.fecha_atencion = datetime.utcnow()
    llamada.asistente_id = asistente.id
    db.session.commit()

    # Activar el relé de la habitación
    activar_rele(llamada.ip_rele, True)

    return jsonify(
        {
            'status': 'success',
            'message': f'Llamada atendida correctamente',
            'llamada': llamada.to_dict()
        }
    )

@llamadas_bp.route('/lista-llamadas', methods=['GET'])
def listar_llamadas_recientes():
    """
    Devuelve la lista de las llamadas registradas en las últimas 24 horas
    """
    from datetime import datetime, timedelta
    tiempo_limite = datetime.utcnow() - timedelta(seconds=current_app.config['RECENT_CALLS_TIME'])

    # Obtener las llamadas recientes
    llamadas = Llamada.query.filter(Llamada.fecha_llamada >= tiempo_limite).order_by(Llamada.fecha_llamada.desc()).all()

    return jsonify(
        {
            'status': 'success',
            'llamadas': [llamada.to_dict() for llamada in llamadas]
        }
    )