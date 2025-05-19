import React from 'react';

const AsistenteItem = ({ asistente, onEdit, onDelete }) => {
  return (
    <div className="list-item">
      <div className="asistente-info">
        <h3>{asistente.nombre}</h3>
        <p>Código: <strong>{asistente.codigo}</strong></p>
      </div>
      <div className="asistente-actions">
        <button 
          className="btn" 
          onClick={() => onEdit(asistente)}
          style={{ marginRight: '10px' }}
        >
          Editar
        </button>
        <button 
          className="btn btn-danger" 
          onClick={() => {
            if (window.confirm(`¿Estás seguro de eliminar a ${asistente.nombre}?`)) {
              onDelete(asistente.id);
            }
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default AsistenteItem;