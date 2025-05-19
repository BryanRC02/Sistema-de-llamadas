import React from 'react';
import LlamadaItem from './LlamadaItem';

const LlamadasList = ({ llamadas, onAtender, title = "Llamadas Recientes" }) => {
  // Agrupar llamadas por estado
  const pendientes = llamadas.filter(llamada => !llamada.hora_atencion);
  const atendidas = llamadas.filter(llamada => llamada.hora_atencion && !llamada.hora_presencia);
  const completadas = llamadas.filter(llamada => llamada.hora_presencia);

  if (!llamadas || llamadas.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title">{title}</h2>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>No hay llamadas registradas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>

      {pendientes.length > 0 && (
        <div className="llamadas-section">
          <h3 style={{ margin: '15px 0', color: '#f39c12' }}>Pendientes ({pendientes.length})</h3>
          <div className="list">
            {pendientes.map(llamada => (
              <LlamadaItem
                key={llamada.id}
                llamada={llamada}
                onAtender={onAtender}
              />
            ))}
          </div>
        </div>
      )}

      {atendidas.length > 0 && (
        <div className="llamadas-section">
          <h3 style={{ margin: '20px 0 15px', color: '#3498db' }}>Atendidas ({atendidas.length})</h3>
          <div className="list">
            {atendidas.map(llamada => (
              <LlamadaItem
                key={llamada.id}
                llamada={llamada}
              />
            ))}
          </div>
        </div>
      )}

      {completadas.length > 0 && (
        <div className="llamadas-section">
          <h3 style={{ margin: '20px 0 15px', color: '#2ecc71' }}>Completadas ({completadas.length})</h3>
          <div className="list">
            {completadas.map(llamada => (
              <LlamadaItem
                key={llamada.id}
                llamada={llamada}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LlamadasList;