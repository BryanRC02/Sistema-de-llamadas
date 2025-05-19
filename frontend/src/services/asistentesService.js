import api from './api';
import axios from 'axios';

// Obtener todos los asistentes
const getAsistentes = async () => {
  try {
    const response = await axios.get(`${api.API_URL}/asistentes`);
    return response.data;
  } catch (error) {
    return api.handleApiError(error);
  }
};

// Crear un nuevo asistente
const createAsistente = async (asistenteData) => {
  try {
    const response = await axios.post(`${api.API_URL}/asistentes`, asistenteData);
    return response.data;
  } catch (error) {
    return api.handleApiError(error);
  }
};

// Actualizar un asistente existente
const updateAsistente = async (asistenteData) => {
  try {
    const response = await axios.put(`${api.API_URL}/asistentes`, asistenteData);
    return response.data;
  } catch (error) {
    return api.handleApiError(error);
  }
};

// Eliminar un asistente
const deleteAsistente = async (asistenteId) => {
  try {
    const response = await axios.delete(`${api.API_URL}/asistentes`, {
      data: { id: asistenteId }
    });
    return response.data;
  } catch (error) {
    return api.handleApiError(error);
  }
};

// Enrolar un asistente
const enrollAsistente = async (codigo) => {
  try {
    const formData = new FormData();
    formData.append('codigo', codigo);
    
    const response = await axios.post(`${api.API_URL}/enroll`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    return api.handleApiError(error);
  }
};

// Desenrolar un asistente
const unenrollAsistente = async () => {
  try {
    const response = await axios.get(`${api.API_URL}/desenroll`);
    return response.data;
  } catch (error) {
    return api.handleApiError(error);
  }
};

export default {
  getAsistentes,
  createAsistente,
  updateAsistente,
  deleteAsistente,
  enrollAsistente,
  unenrollAsistente
};