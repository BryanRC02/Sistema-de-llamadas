import React from 'react';
import AsistenteItem from './AsistenteItem';

const AsistentesList = ({ asistentes, onEdit, onDelete }) => {
  if (!asistentes || asistentes.length === 0) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>No hay asistentes registrados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Lista de Asistentes</h2>
      <div className="list">
        {asistentes.map(asistente => (
          <AsistenteItem
            key={asistente.id}
            asistente={asistente}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AsistentesList;