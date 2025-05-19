// Configuración de la API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Función para manejar errores de la API
const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // La petición fue hecha y el servidor respondió con un código diferente a 2xx
    console.error('Error data:', error.response.data);
    console.error('Error status:', error.response.status);
    return {
      error: true,
      message: error.response.data.message || 'Error en la petición',
      status: error.response.status
    };
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    console.error('Error request:', error.request);
    return {
      error: true,
      message: 'No se recibió respuesta del servidor',
      status: 0
    };
  } else {
    // Algo sucedió al configurar la petición que provocó un error
    return {
      error: true,
      message: error.message,
      status: 0
    };
  }
};

export default {
  API_URL,
  handleApiError
};