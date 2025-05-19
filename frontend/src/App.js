import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AsistentesPage from './pages/AsistentesPage';
import EnrollPage from './pages/EnrollPage';
import HistoricoPage from './pages/HistoricoPage';
import SimulatorPage from './pages/SimulatorPage';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/asistentes" element={<AsistentesPage />} />
            <Route path="/enroll" element={<EnrollPage />} />
            <Route path="/historico" element={<HistoricoPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Sistema de Llamadas Paciente-Enfermero &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;