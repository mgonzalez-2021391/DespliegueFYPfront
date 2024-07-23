import React, { useEffect, useState, useRef } from 'react';
import './Vet.css';
import { useGetAllVets } from '../../shared/hooks/vet/useGetAllVets.jsx';
import { useAddVet } from '../../shared/hooks/vet/useAddVet.jsx';
import { useUpdateVet } from '../../shared/hooks/vet/useUpdateVet.jsx';
import { useDeleteVet } from '../../shared/hooks/vet/useDeleteVet.jsx';
import { Navbar } from '../Navbar/Navbar'; // Importa el componente Navbar

export const Vet = () => {
  const { getVets, isFetching, getAllVets } = useGetAllVets();
  const { registerVet } = useAddVet();
  const { updatedVet } = useUpdateVet();
  const { deleteVet } = useDeleteVet();

  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formData, setFormData] = useState({ nombre: '', apellido: '', telefono: '' });
  const [editingVet, setEditingVet] = useState(null);
  const [reloadComponent, setRealoadComponent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const formRef = useRef(null);

  useEffect(() => {
    getAllVets();
  }, [getAllVets]);

  const handleRegisterVet = async (event) => {
    event.preventDefault();
    const vetData = { name, surname, phoneNumber };
    if (editingVet) {
      await updatedVet(editingVet, vetData);
      setEditingVet(null);
    } else {
      await registerVet(vetData);
    }
    await getAllVets();
    formRef.current.reset();
    setName('');
    setSurName('');
    setPhoneNumber('');
    setRealoadComponent(!reloadComponent);
    setShowForm(false);
  };

  const handleEditVet = (vet) => {
    setName(vet.name);
    setSurName(vet.surname);
    setPhoneNumber(vet.phoneNumber);
    setEditingVet(vet._id);
    setShowForm(true);
  };

  const handleAdd = () => {
    setName('');
    setSurName('');
    setPhoneNumber('');
    setEditingVet(null);
    setShowForm(true);
  };

  const handleEdit = (index) => {
    setFormData(data[index]);
    setCurrentIndex(index);
    setEditingVet(true);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]{0,8}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este veterinario?')) {
      try {
        await deleteVet(id);
        await getAllVets();
      } catch (error) {
        toast.error(`Error al eliminar el veterinario: ${error.message}`);
      }
    }
  };

  const handleCancel = () => {
    setEditingVet(null);
    setShowForm(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = getVets.filter((vet) =>
    vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.phoneNumber.includes(searchTerm)
  );

  return (
    <>
      <Navbar />
      <div className="vet-container fade-in">
        <div className="vet-title">
          <i className="paw-icon fas fa-paw"></i>
          Veterinarios
          <i className="paw-icon fas fa-paw"></i>
          <div className="vet-line"></div>
        </div>
        <input
          type="text"
          className="vet-search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {showForm && (
          <div className={`vet-form-overlay ${showForm ? 'show' : ''}`}>
            <div className="vet-form fade-in">
              <div className="vet-form-title">
                <i className="paw-icon fas fa-paw"></i>
                {editingVet ? 'Editar Veterinario' : 'Agregar Veterinario'}
                <i className="paw-icon fas fa-paw"></i>
              </div>
              <div className="vet-line"></div>
              <form ref={formRef} onSubmit={handleRegisterVet} className="vet-form-content">
                <div className="vet-form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="vet-form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    id="apellido"
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={surname}
                    onChange={(e) => setSurName(e.target.value)}
                    required
                  />
                </div>
                <div className="vet-form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    id="telefono"
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    maxLength='8'
                    required
                  />
                </div>
                <div className="vet-form-buttons">
                  <button className="save-btn" type='submit'>
                    {editingVet ? 'Actualizar' : 'Guardar'}
                  </button>
                  <button className="cancel-btn" type="button" onClick={handleCancel}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {isFetching ? (
          <div>Cargando ... </div>
        ) : (
          <div className="vet-table-container">
            <table className="vet-table fade-in">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((vet, index) => (
                    <tr key={vet._id || index} onClick={() => handleEditVet(vet)}>
                      <td>{vet.name}</td>
                      <td>{vet.surname}</td>
                      <td>{vet.phoneNumber}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(index)}>Editar</button>
                        <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(vet._id) }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: '#fff' }}>No se encontraron datos</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <button className="vet-add-button" onClick={handleAdd}>Agregar</button>
      </div>
    </>
  );
};
