import api from './api';
import axios from 'axios';

// Obtener lista de llamadas recientes
const getLlamadas = async () => {
  try {
    const response = await axios.get(`${api.API_URL}/lista-llamadas`);
    return response.data;
  } catch (error) {
    return api.handleApiError(error);
  }
};

// Simular una llamada de una habitación
const simularLlamada = async (habitacion, cama) => {
  try {
    const response = await axios.get(`${api.API_URL}/llamada/${habitacion}/${cama}`);
    return response.data;
  } catch (error) {
    return api.handleApiError(error);
  }
};

// Simular presencia en una habitación
const simularPresencia = async (habitacion, cama) => {
  try {
    const response = await axios.get(`${api.API_URL}/presencia/${habitacion}/${cama}`);
    return response.data;
  } catch (error) {
    return api.handleApiError(error);
  }
};

// Atender una llamada
const atenderLlamada = async (llamadaId) => {
  try {
    const response = await axios.get(`${api.API_URL}/atender/${llamadaId}`);
    return response.data;
  } catch (error) {
    return api.handleApiError(error);
  }
};

export default {
  getLlamadas,
  simularLlamada,
  simularPresencia,
  atenderLlamada
};