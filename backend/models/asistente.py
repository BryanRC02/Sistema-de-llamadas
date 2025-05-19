from app import db
from datetime import datetime

class Asistente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(6), unique=True, nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    activo = db.Column(db.Boolean, default=True)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)

    # Relación con la tabla de llamadas
    llamadas = db.relationship('Llamada', backref='asistente', lazy=True)

    # Representación del objeto Asistente
    def __repr__(self):
        return f'<Asistente {self.codigo}: {self.nombre}>'
    
    # Convertir el objeto Asistente a un diccionario
    def to_dict(self):
        return {
            'id': self.id,
            'codigo': self.codigo,
            'nombre': self.nombre,
            'activo': self.activo,
            'fecha_creacion': self.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S')
        }