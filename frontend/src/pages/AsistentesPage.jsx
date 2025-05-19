import React, { useState, useEffect } from 'react';
import AsistentesList from '../components/Asistentes/AsistentesList';
import AsistenteForm from '../components/Asistentes/AsistenteForm';
import asistentesService from '../services/asistentesService';

const AsistentesPage = () => {
  const [asistentes, setAsistentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAsistente, setEditingAsistente] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar lista de asistentes al montar el componente
  useEffect(() => {
    fetchAsistentes();
  }, []);

  // Función para cargar asistentes
  const fetchAsistentes = async () => {
    setLoading(true);
    try {
      const data = await asistentesService.getAsistentes();
      if (data.error) {
        setError(data.message);
      } else {
        setAsistentes(data);
        setError(null);
      }
    } catch (err) {
      setError('Error al cargar asistentes. Intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Manejar creación de asistente
  const handleCreateAsistente = async (asistenteData) => {
    try {
      const result = await asistentesService.createAsistente(asistenteData);
      if (result.error) {
        alert(`Error: ${result.message}`);
      } else {
        fetchAsistentes();
        setShowForm(false);
        alert('Asistente creado correctamente');
      }
    } catch (err) {
      alert('Error al crear asistente');
      console.error(err);
    }
  };

  // Manejar actualización de asistente
  const handleUpdateAsistente = async (asistenteData) => {
    try {
      const result = await asistentesService.updateAsistente(asistenteData);
      if (result.error) {
        alert(`Error: ${result.message}`);
      } else {
        fetchAsistentes();
        setEditingAsistente(null);
        alert('Asistente actualizado correctamente');
      }
    } catch (err) {
      alert('Error al actualizar asistente');
      console.error(err);
    }
  };

  // Manejar eliminación de asistente
  const handleDeleteAsistente = async (asistenteId) => {
    try {
      const result = await asistentesService.deleteAsistente(asistenteId);
      if (result.error) {
        alert(`Error: ${result.message}`);
      } else {
        fetchAsistentes();
        alert('Asistente eliminado correctamente');
      }
    } catch (err) {
      alert('Error al eliminar asistente');
      console.error(err);
    }
  };

  // Manejar edición de asistente
  const handleEditAsistente = (asistente) => {
    setEditingAsistente(asistente);
    setShowForm(true);
  };

  // Manejar envío del formulario
  const handleSubmit = (formData) => {
    if (editingAsistente) {
      handleUpdateAsistente(formData);
    } else {
      handleCreateAsistente(formData);
    }
  };

  // Manejar cancelación del formulario
  const handleCancel = () => {
    setEditingAsistente(null);
    setShowForm(false);
  };

  return (
    <div className="asistentes-page">
      <h1 className="page-title">Gestión de Asistentes</h1>

      {/* Botón para mostrar formulario de creación */}
      {!showForm && (
        <button 
          className="btn" 
          onClick={() => {
            setEditingAsistente(null);
            setShowForm(true);
          }}
          style={{ marginBottom: '20px' }}
        >
          Nuevo Asistente
        </button>
      )}

      {/* Mostrar formulario de creación/edición */}
      {showForm && (
        <AsistenteForm 
          onSubmit={handleSubmit} 
          asistente={editingAsistente}
          onCancel={handleCancel}
        />
      )}

      {/* Mostrar estado de carga o error */}
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <p>Cargando asistentes...</p>
        </div>
      ) : error ? (
        <div className="card" style={{ textAlign: 'center', padding: '20px', color: '#e74c3c' }}>
          <p>{error}</p>
          <button 
            className="btn" 
            onClick={fetchAsistentes}
            style={{ marginTop: '10px' }}
          >
            Reintentar
          </button>
        </div>
      ) : (
        /* Mostrar lista de asistentes */
        <AsistentesList 
          asistentes={asistentes} 
          onEdit={handleEditAsistente} 
          onDelete={handleDeleteAsistente} 
        />
      )}
    </div>
  );
};

export default AsistentesPage;