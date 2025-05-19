import requests

def activar_rele(ip, estado):
    """
    Activa o desactiva un relé mediante petición HTTP
    
    Args:
        ip (str): Dirección IP del relé
        estado (bool): True para encender, False para apagar
    
    Returns:
        bool: True si la operación fue exitosa, False en caso contrario
    """
    try:
        # Determinar acción según el estado
        accion = "on" if estado else "off"
        
        # URL para controlar el relé
        url = f"http://{ip}/relay/0?turn={accion}"
        
        # Realizar petición HTTP
        response = requests.get(url, timeout=5)
        
        # Verificar respuesta
        if response.status_code == 200:
            print(f"Relé {ip} {'encendido' if estado else 'apagado'} correctamente")
            return True
        else:
            print(f"Error al controlar relé {ip}: Código {response.status_code}")
            return False
            
    except Exception as e:
        print(f"Excepción al controlar relé {ip}: {str(e)}")
        return False