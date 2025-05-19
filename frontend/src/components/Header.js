import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Sistema de Llamadas</div>
        <nav className="nav">
          <ul>
            <li><NavLink to="/" end>Inicio</NavLink></li>
            <li><NavLink to="/asistentes">Asistentes</NavLink></li>
            <li><NavLink to="/enroll">Enrolar</NavLink></li>
            <li><NavLink to="/historico">Histórico</NavLink></li>
            <li><NavLink to="/simulator">Simulador</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;