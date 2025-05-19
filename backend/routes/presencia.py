from flask import Blueprint, request, jsonify
from models.llamada import Llamada
from app import db
from datetime import datetime
from services.relay import activar_rele

presencia_bp = Blueprint('presencia', __name__)

@presencia_bp.route('/presencia/<habitacion>/<cama>', methods=['GET'])
def registrar_presencia(habitacion, cama):
    """
    Registra la presencia de un asistente en la habitación
    """
    # Buscar la llamada correspondiente que esté en estado 'atendida'
    llamada = Llamada.query.filter_by(
        habitacion=habitacion,
        cama=cama,
        estado='atendida'
    ).order_by(Llamada.fecha_llamada.desc()).first()

    if not llamada:
        return jsonify(
            {
                'status': 'error',
                'message': 'No se encontró una llamada activa para esta habitación y cama'
            }
        ), 404
    
    # Actualizar el estado de la llamada
    llamada.estado = 'completada'
    llamada.fecha_presencia = datetime.utcnow()
    db.session.commit()

    # Apagar el piloto de la habitación
    activar_rele(llamada.ip_rele, False)

    return jsonify({
        'status': 'success',
        'message': f'Presencia registrada para la habitación {habitacion}, cama {cama}',
        'llamada': llamada.to_dict()
    })