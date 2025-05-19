from app import db

class Rele(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    habitacion = db.Column(db.String(10), nullable=False)
    cama = db.Column(db.String(1), nullable=False)
    ip = db.Column(db.String(15), nullable=False)
    activo = db.Column(db.Boolean, default=True)
    
    # Índice compuesto para habitación y cama
    __table_args__ = (
        db.UniqueConstraint('habitacion', 'cama', name='uix_habitacion_cama'),
    )

    def __repr__(self):
        return f'<Rele {self.habitacion}-{self.cama}: {self.ip}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'habitacion': self.habitacion,
            'cama': self.cama,
            'ip': self.ip,
            'activo': self.activo
        } 