import React, { useState } from 'react';
import llamadasService from '../../services/llamadasService';

const HabitacionSimulator = ({ habitacion, pilotos, onLlamadaRealizada, onPresenciaRealizada }) => {
  const [isLoading, setIsLoading] = useState({
    llamadaA: false,
    llamadaB: false,
    presenciaA: false,
    presenciaB: false
  });

  // Manejador para el botón de llamada
  const handleLlamada = async (cama) => {
    // Actualizamos el estado de carga
    setIsLoading(prev => ({
      ...prev,
      [`llamada${cama}`]: true
    }));

    try {
      const resultado = await llamadasService.simularLlamada(habitacion, cama.toLowerCase());
      
      if (resultado.error) {
        alert(`Error: ${resultado.message}`);
      } else {
        if (onLlamadaRealizada) {
          onLlamadaRealizada(habitacion, cama.toLowerCase(), resultado);
        }
      }
    } catch (error) {
      console.error('Error al realizar llamada:', error);
      alert('Ha ocurrido un error al realizar la llamada.');
    } finally {
      // Restauramos el estado de carga
      setIsLoading(prev => ({
        ...prev,
        [`llamada${cama}`]: false
      }));
    }
  };

  // Manejador para el botón de presencia
  const handlePresencia = async (cama) => {
    setIsLoading(prev => ({
      ...prev,
      [`presencia${cama}`]: true
    }));

    try {
      const resultado = await llamadasService.simularPresencia(habitacion, cama.toLowerCase());
      
      if (resultado.error) {
        alert(`Error: ${resultado.message}`);
      } else {
        if (onPresenciaRealizada) {
          onPresenciaRealizada(habitacion, cama.toLowerCase(), resultado);
        }
      }
    } catch (error) {
      console.error('Error al registrar presencia:', error);
      alert('Ha ocurrido un error al registrar la presencia.');
    } finally {
      setIsLoading(prev => ({
        ...prev,
        [`presencia${cama}`]: false
      }));
    }
  };

  // Determinamos si un piloto está activo
  const isPilotoActivo = (cama) => {
    return pilotos && pilotos[`${habitacion}-${cama.toLowerCase()}`] === true;
  };

  return (
    <div className="habitacion-card">
      <h3 className="habitacion-titulo">Habitación {habitacion}</h3>
      
      <div className="camas-container">
        {/* Cama A */}
        <div className="cama">
          <p className="cama-label">Cama A</p>
          
          <button 
            className="boton-llamada"
            onClick={() => handleLlamada('A')}
            disabled={isLoading.llamadaA}
          >
            {isLoading.llamadaA ? 'Enviando...' : 'Llamar'}
          </button>
          
          <button 
            className="boton-presencia"
            onClick={() => handlePresencia('A')}
            disabled={isLoading.presenciaA}
          >
            {isLoading.presenciaA ? 'Enviando...' : 'Presencia'}
          </button>
          
          <div className={`piloto ${isPilotoActivo('a') ? 'piloto-activo' : ''}`}></div>
        </div>
        
        {/* Cama B */}
        <div className="cama">
          <p className="cama-label">Cama B</p>
          
          <button 
            className="boton-llamada"
            onClick={() => handleLlamada('B')}
            disabled={isLoading.llamadaB}
          >
            {isLoading.llamadaB ? 'Enviando...' : 'Llamar'}
          </button>
          
          <button 
            className="boton-presencia"
            onClick={() => handlePresencia('B')}
            disabled={isLoading.presenciaB}
          >
            {isLoading.presenciaB ? 'Enviando...' : 'Presencia'}
          </button>
          
          <div className={`piloto ${isPilotoActivo('b') ? 'piloto-activo' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default HabitacionSimulator;