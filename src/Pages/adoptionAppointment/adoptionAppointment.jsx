import React, { useEffect, useState, useRef } from 'react';
import './adoptionAppointment.css';
import { useGetAllAppointments } from '../../shared/hooks/adoptionAppointment/useGetAllAppointments';
import { useAddAppointment } from '../../shared/hooks/adoptionAppointment/useAddAppointment';
import { useUpdateAppointment } from '../../shared/hooks/adoptionAppointment/useUpdateAppointment';
import { useDeleteAppointment } from '../../shared/hooks/adoptionAppointment/useDeleteAppointment';


export const AdoptionAppointment = () => {
  const { getAppointments, isFetching, getAllAppointments } = useGetAllAppointments();
  const { registerAppointment } = useAddAppointment();
  const { updatedAppointment } = useUpdateAppointment();
  const { deleteAppointment } = useDeleteAppointment();

  const [formData, setFormData] = useState({ date: '', user: '' });
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const formRef = useRef(null);

  useEffect(() => {
    getAllAppointments();
  }, [getAllAppointments]);

  const handleRegisterAppointment = async (event) => {
    event.preventDefault();
    if (editingAppointment) {
      await updatedAppointment(editingAppointment, formData);
      setEditingAppointment(null);
    } else {
      await registerAppointment(formData);
    }
    await getAllAppointments();
    formRef.current.reset();
    setFormData({ date: '', user: '' });
    setShowForm(false);
  };

  const handleEditAppointment = (appointment) => {
    setFormData({ date: appointment.date, user: appointment.user.name });
    setEditingAppointment(appointment._id);
    setShowForm(true);
  };

  const handleAdd = () => {
    setFormData({ date: '', user: '' });
    setEditingAppointment(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cita de adopción?')) {
      try {
        await deleteAppointment(id);
        await getAllAppointments();
      } catch (error) {
        toast.error(`Error al eliminar la cita de adopción: ${error.message}`);
      }
    }
  };

  const handleCancel = () => {
    setEditingAppointment(null);
    setShowForm(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = getAppointments ? getAppointments.filter((appointment) =>
    appointment.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="appointment-container fade-in">
      <div className="appointment-title">
        <i className="paw-icon fas fa-paw"></i>
        Citas de Adopción
        <i className="paw-icon fas fa-paw"></i>
        <div className="appointment-line"></div>
      </div>
      <input
        type="text"
        className="appointment-search"
        placeholder="Buscar por usuario..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {showForm && (
        <div className={`appointment-form-overlay ${showForm ? 'show' : ''}`}>
          <div className="appointment-form fade-in">
            <div className="appointment-form-title">
              <i className="paw-icon fas fa-paw"></i>
              {editingAppointment ? 'Editar Cita' : 'Agregar Cita'}
              <i className="paw-icon fas fa-paw"></i>
            </div>
            <div className="appointment-line"></div>
            <form ref={formRef} onSubmit={handleRegisterAppointment} className="appointment-form-content">
              <div className="appointment-form-group">
                <label htmlFor="date">Fecha</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  placeholder="Fecha"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="appointment-form-group">
                <label htmlFor="user">Usuario</label>
                <input
                  id="user"
                  type="text"
                  name="user"
                  placeholder="Usuario"
                  value={formData.user}
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                  required
                />
              </div>
              <div className="appointment-form-buttons">
                <button className="save-btn" type="submit">
                  {editingAppointment ? 'Actualizar' : 'Guardar'}
                </button>
                <button className="cancel-btn" type="button" onClick={handleCancel}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isFetching ? (
        <div>Cargando ...</div>
      ) : (
        <div className="appointment-table-container">
          <table className="appointment-table fade-in">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((appointment, index) => (
                  <tr key={appointment._id || index}>
                    <td>{appointment.date}</td>
                    <td>{appointment.user.name}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditAppointment(appointment)}>Editar</button>
                      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(appointment._id) }}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', color: '#fff' }}>No se encontraron datos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <button className="appointment-add-button" onClick={handleAdd}>Agregar</button>
    </div>
  );
};