import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="page-title">Sistema de Llamadas Paciente-Enfermero</h1>
      
      <div className="card">
        <h2 className="card-title">Bienvenido al Sistema de Llamadas</h2>
        <p>
          Esta aplicación permite gestionar las llamadas de asistencia de pacientes en un centro sanitario.
          Puede utilizar las siguientes funcionalidades:
        </p>
        
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div className="feature-card" style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Gestión de Asistentes</h3>
            <p>Crear, modificar y eliminar asistentes del sistema.</p>
            <Link to="/asistentes" className="btn" style={{ marginTop: '10px', display: 'inline-block' }}>Ir a Asistentes</Link>
          </div>
          
          <div className="feature-card" style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Enrolamiento</h3>
            <p>Enrolar un asistente en un dispositivo para recibir notificaciones.</p>
            <Link to="/enroll" className="btn" style={{ marginTop: '10px', display: 'inline-block' }}>Ir a Enrolar</Link>
          </div>
          
          <div className="feature-card" style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Histórico de Llamadas</h3>
            <p>Ver el histórico de llamadas realizadas en las últimas 24 horas.</p>
            <Link to="/historico" className="btn" style={{ marginTop: '10px', display: 'inline-block' }}>Ir a Histórico</Link>
          </div>
          
          <div className="feature-card" style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Simulador</h3>
            <p>Simular llamadas y presencias para probar el sistema.</p>
            <Link to="/simulator" className="btn" style={{ marginTop: '10px', display: 'inline-block' }}>Ir a Simulador</Link>
          </div>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '30px' }}>
        <h2 className="card-title">Acerca del Sistema</h2>
        <p>
          Este sistema implementa un mecanismo de llamadas paciente-enfermero mediante el cual los pacientes pueden solicitar
          asistencia en su habitación mediante la pulsación de un dispositivo instalado en su cama.
        </p>
        <p style={{ marginTop: '10px' }}>
          La aplicación gestiona las notificaciones, el registro de llamadas, la asignación de asistentes y el control
          de los pilotos luminosos que indican asistencia aceptada.
        </p>
      </div>
    </div>
  );
};

export default HomePage;