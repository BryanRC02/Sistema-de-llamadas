from flask import Blueprint, request, jsonify, make_response, render_template
from models.asistente import Asistente
from app import db
import random
import string

asistentes_bp = Blueprint('asistentes', __name__)

def generar_codigo_asistente(longitud=6):
    """
    Genera un código único alfanumérico para un asistente
    """
    caracteres = string.ascii_uppercase + string.digits
    while True:
        codigo = ''.join(random.choice(caracteres) for _ in range(longitud))
        # Verificar que el código no exista ya
        existe = Asistente.query.filter_by(codigo=codigo).first()
        if not existe:
            return codigo
        
@asistentes_bp.route('/asistentes', methods=['GET', 'POST', 'PUT', 'DELETE'])
def gestionar_asistentes():
    """
    Gestion CRUD de asistentes
    """
    # OBTENER LISTA DE ASISTENTES
    if request.method == 'GET':
        asistentes = Asistente.query.all()
        return jsonify({
            'status': 'success',
            'asistentes': [asistente.to_dict() for asistente in asistentes]
        })
    
    # CREAR NUEVO ASISTENTE
    elif request.method == 'POST':
        data = request.get_json()
        
        if not data or 'nombre' not in data:
            return jsonify({
                'status': 'error',
                'message': 'Nombre de asistente requerido'
            }), 400
        
        # Generar código único
        codigo = data.get('codigo', generar_codigo_asistente())
        
        nuevo_asistente = Asistente(
            codigo=codigo,
            nombre=data['nombre'],
            activo=data.get('activo', True)
        )
        
        db.session.add(nuevo_asistente)
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Asistente creado correctamente',
            'asistente': nuevo_asistente.to_dict()
        }), 201
    
    # ACTUALIZAR ASISTENTE
    elif request.method == 'PUT':
        data = request.get_json()
        
        if not data or 'id' not in data:
            return jsonify({
                'status': 'error',
                'message': 'ID de asistente requerido'
            }), 400
        
        asistente = Asistente.query.get(data['id'])
        
        if not asistente:
            return jsonify({
                'status': 'error',
                'message': 'Asistente no encontrado'
            }), 404
        
        # Actualizar campos
        if 'nombre' in data:
            asistente.nombre = data['nombre']
        if 'activo' in data:
            asistente.activo = data['activo']
        
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Asistente actualizado correctamente',
            'asistente': asistente.to_dict()
        })
    
    # ELIMINAR ASISTENTE
    elif request.method == 'DELETE':
        data = request.get_json()
        
        if not data or 'id' not in data:
            return jsonify({
                'status': 'error',
                'message': 'ID de asistente requerido'
            }), 400
        
        asistente = Asistente.query.get(data['id'])
        
        if not asistente:
            return jsonify({
                'status': 'error',
                'message': 'Asistente no encontrado'
            }), 404
        
        db.session.delete(asistente)
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Asistente eliminado correctamente'
        })

@asistentes_bp.route('/enroll', methods=['GET', 'POST'])
def enrolar_asistente():
    """
    Página para enrolar un asistente (crear cookie)
    """
    if request.method == 'POST':
        codigo = request.form.get('codigo')
        
        if not codigo:
            return jsonify({
                'status': 'error',
                'message': 'Código de asistente requerido'
            }), 400
        
        # Verificar que el asistente existe
        asistente = Asistente.query.filter_by(codigo=codigo).first()
        
        if not asistente:
            return jsonify({
                'status': 'error',
                'message': 'Código de asistente inválido'
            }), 404
        
        # Crear cookie con el código del asistente
        response = make_response(jsonify({
            'status': 'success',
            'message': f'Asistente {asistente.nombre} enrolado correctamente'
        }))
        
        response.set_cookie('asistente', codigo)
        
        return response
    
    # Si es GET, mostrar formulario de enrolamiento
    return render_template('enroll.html')

@asistentes_bp.route('/desenroll', methods=['GET'])
def desenrolar_asistente():
    """
    Elimina la cookie de enrolamiento
    """
    response = make_response(jsonify({
        'status': 'success',
        'message': 'Cookie de asistente eliminada'
    }))
    
    response.delete_cookie('asistente')
    
    return response