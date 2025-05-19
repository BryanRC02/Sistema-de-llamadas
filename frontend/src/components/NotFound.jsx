import React from 'react';

const NotFound = () => {
  return (
    <div className="not-found" style={{ textAlign: 'center', padding: '50px 0' }}>
      <h1 style={{ fontSize: '6rem', margin: '0', color: '#e74c3c' }}>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
    </div>
  );
};

export default NotFound;