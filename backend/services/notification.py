import requests
from flask import current_app

def enviar_notificacion(mensaje, url=None, titulo_url=None):
    """
    Envía una notificación mediante la API de Pushover
    
    Args:
        mensaje (str): Texto del mensaje a enviar
        url (str, optional): URL para incluir en la notificación
        titulo_url (str, optional): Título para la URL
    
    Returns:
        bool: True si la notificación se envió correctamente, False en caso contrario
    """
    try:
        # Obtener configuración de Pushover
        app_token = current_app.config['PUSHOVER_APP_TOKEN']
        user_key = current_app.config['PUSHOVER_USER_KEY']
        priority = current_app.config['PUSHOVER_PRIORITY']
        retry = current_app.config['PUSHOVER_RETRY']
        expire = current_app.config['PUSHOVER_EXPIRE']
        
        # Preparar datos de la notificación
        payload = {
            "token": app_token,
            "user": user_key,
            "message": mensaje,
            "priority": priority,
            "retry": retry,
            "expire": expire,
            "html": 1  # Habilitar formato HTML
        }
        
        # Añadir URL si se proporciona
        if url:
            payload["url"] = url
        
        # Añadir título de URL si se proporciona
        if titulo_url:
            payload["url_title"] = titulo_url
        
        # Enviar notificación
        response = requests.post(
            current_app.config['PUSHOVER_API_URL'],
            data=payload
        )
        
        # Verificar respuesta
        if response.status_code == 200:
            return True
        else:
            print(f"Error al enviar notificación Pushover: {response.text}")
            return False
            
    except Exception as e:
        print(f"Excepción al enviar notificación Pushover: {str(e)}")
        return False