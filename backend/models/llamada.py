from app import db
from datetime import datetime

class Llamada(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    habitacion = db.Column(db.String(10), nullable=False)
    cama = db.Column(db.String(1), nullable=False)

    # Fechas relevantes
    fecha_llamada = db.Column(db.DateTime, default=datetime.utcnow)
    fecha_atencion = db.Column(db.DateTime, nullable=True)
    fecha_presencia = db.Column(db.DateTime, nullable=True)

    # Estado de la llamada
    estado = db.Column(db.String(20), default='pendiente')

    # Relación con la tabla de asistentes
    asistente_id = db.Column(db.Integer, db.ForeignKey('asistente.id'), nullable=True)

    # Dirección IP del relé asociado a la habitación/cama
    ip_rele = db.Column(db.String(15), nullable=True)

    # Representación del objeto llamada
    def __repr__(self):
        return f'<Llamada {self.habitacion}-{self.cama} ({self.estado})>'
    
    # Convertir el objeto Llamada a un diccionario
    def to_dict(self):
        return {
            'id': self.id,
            'habitacion': self.habitacion,
            'cama': self.cama,
            'fecha_llamada': self.fecha_llamada.strftime('%Y-%m-%d %H:%M:%S'),
            'fecha_atencion': self.fecha_atencion.strftime('%Y-%m-%d %H:%M:%S') if self.fecha_atencion else None,
            'fecha_presencia': self.fecha_presencia.strftime('%Y-%m-%d %H:%M:%S') if self.fecha_presencia else None,
            'estado': self.estado,
            'asistente_id': self.asistente_id,
            'ip_rele': self.ip_rele
        }