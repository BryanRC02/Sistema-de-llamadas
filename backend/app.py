from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from config import Config

# Inicializar la base de datos

db = SQLAlchemy()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Inicializar las extensiones
    db.init_app(app)
    CORS(app)

    # Registrar los blueprints
    from routes.llamadas import llamadas_bp
    from routes.presencia import presencia_bp
    from routes.asistentes import asistentes_bp

    app.register_blueprint(llamadas_bp)
    app.register_blueprint(presencia_bp)
    app.register_blueprint(asistentes_bp)

    # Crear tablas en la base de datos
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)