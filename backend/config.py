import os

class Config:
    # Configuración de la base de datos
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql+pymysql://admin:ppp2025@localhost/sistema_llamadas'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Configuración de Pushover
    PUSHOVER_API_URL = "https://api.pushover.net/1/messages.json"
    PUSHOVER_APP_TOKEN = os.environ.get('PUSHOVER_APP_TOKEN')
    PUSHOVER_USER_KEY = os.environ.get('PUSHOVER_USER_KEY')
    PUSHOVER_PRIORITY = 2
    PUSHOVER_RETRY = 30  # Segundos
    PUSHOVER_EXPIRE = 180  # 3 minutos
    
    # Configuración general
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'clave-secreta-temporal'
    DEBUG = True
    
    # Tiempo para considerar una llamada como "reciente" (24 horas en segundos)
    RECENT_CALLS_TIME = 86400