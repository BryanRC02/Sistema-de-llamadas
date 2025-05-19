from app import db
from models.rele import Rele

def populate_reles():
    """
    Pobla la base de datos con los datos iniciales de los relés
    """
    # Limpiar tabla existente
    Rele.query.delete()
    
    # Crear lista de relés
    reles = []
    
    # Generar datos para 5 plantas
    for planta in range(1, 6):
        # 10 habitaciones por planta
        for habitacion in range(1, 11):
            # 2 camas por habitación
            for cama in ['a', 'b']:
                # Formatear número de habitación (ej: 101, 102, etc.)
                num_habitacion = f"{planta}{habitacion:02d}"
                
                # Generar IP (172.17.X.Y donde X es la planta e Y es el número secuencial)
                ip = f"172.17.{planta}.{habitacion * 2 + (0 if cama == 'a' else 1)}"
                
                rele = Rele(
                    habitacion=num_habitacion,
                    cama=cama,
                    ip=ip,
                    activo=True
                )
                reles.append(rele)
    
    # Guardar todos los relés en la base de datos
    db.session.add_all(reles)
    db.session.commit()
    
    print(f"Se han creado {len(reles)} relés en la base de datos")

if __name__ == '__main__':
    populate_reles() 