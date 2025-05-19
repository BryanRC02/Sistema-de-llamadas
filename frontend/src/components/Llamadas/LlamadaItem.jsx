import React from 'react';
import { formatDate, getTimeElapsed } from '../../utils/formatDate';

const LlamadaItem = ({ llamada, onAtender }) => {
  // Determinar el estado y la clase CSS correspondiente
  const getEstadoClass = () => {
    if (llamada.hora_presencia) {
      return 'estado-completada';
    }
    if (llamada.hora_atencion) {
      return 'estado-atendida';
    }
    return 'estado-pendiente';
  };

  const getEstadoText = () => {
    if (llamada.hora_presencia) {
      return 'Completada';
    }
    if (llamada.hora_atencion) {
      return 'Atendida';
    }
    return 'Pendiente';
  };

  // Calcular tiempo transcurrido entre llamada y atención
  const getTiempoAtencion = () => {
    if (llamada.hora_atencion) {
      return getTimeElapsed(llamada.hora_llamada, llamada.hora_atencion);
    }
    return 'No atendida';
  };

  // Calcular tiempo transcurrido entre atención y presencia
  const getTiempoPresencia = () => {
    if (llamada.hora_presencia && llamada.hora_atencion) {
      return getTimeElapsed(llamada.hora_atencion, llamada.hora_presencia);
    }
    return 'No completada';
  };

  return (
    <div className="list-item">
      <div className="llamada-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Habitación {llamada.habitacion} - Cama {llamada.cama}</h3>
          <span className={getEstadoClass()}>{getEstadoText()}</span>
        </div>
        
        <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          <p><strong>Hora llamada:</strong> {formatDate(llamada.hora_llamada)}</p>
          {llamada.hora_atencion && (
            <p><strong>Hora atención:</strong> {formatDate(llamada.hora_atencion)}</p>
          )}
          {llamada.hora_presencia && (
            <p><strong>Hora presencia:</strong> {formatDate(llamada.hora_presencia)}</p>
          )}
          
          <div style={{ marginTop: '8px' }}>
            <p><strong>Tiempo hasta atención:</strong> {getTiempoAtencion()}</p>
            {llamada.hora_atencion && (
              <p><strong>Tiempo hasta presencia:</strong> {getTiempoPresencia()}</p>
            )}
          </div>
          
          {llamada.asistente && (
            <p style={{ marginTop: '8px' }}><strong>Asistente:</strong> {llamada.asistente}</p>
          )}
        </div>
      </div>
      
      {!llamada.hora_atencion && onAtender && (
        <div className="llamada-actions">
          <button 
            className="btn btn-success" 
            onClick={() => onAtender(llamada.id)}
          >
            Atender
          </button>
        </div>
      )}
    </div>
  );
};

export default LlamadaItem;