import React, { useEffect, useState, useRef } from 'react';
import { useGetAllVeterinaries } from '../../shared/hooks/veterinary/useGetAllVeterinaries';
import { useAddVeterinary } from '../../shared/hooks/veterinary/useAddVeterinary';
import { useUpdateVeterinary } from '../../shared/hooks/veterinary/useUpdateVeterinary';
import { useDeleteVeterinary } from '../../shared/hooks/veterinary/useDeleteVeterinary';
import { Navbar } from '../Navbar/Navbar';
import './Veterinary.css';

export const Veterinary = () => {
  const { getVeterinaries, isFetching, getAllVeterinaries } = useGetAllVeterinaries();
  const { registerVeterinary } = useAddVeterinary();
  const { updatedVeterinary } = useUpdateVeterinary();
  const { deleteVeterinary } = useDeleteVeterinary();

  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState('');
  const [description, setDescription] = useState('');
  const [pet, setPet] = useState('');
  const [vet, setVet] = useState('');
  const [veterinaryAppointment, setVeterinaryAppointment] = useState('');
  const [adoptionAppointment, setAdoptionAppointment] = useState('');
  const [editingVeterinary, setEditingVeterinary] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewImage, setViewImage] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    getAllVeterinaries();
  }, [getAllVeterinaries]);

  const handleRegisterVeterinary = async (event) => {
    event.preventDefault();
    const veterinaryData = {
      user,
      name,
      location,
      schedule,
      description,
      pet,
      vet,
      veterinaryAppointment,
      adoptionAppointment,
    };
    if (editingVeterinary) {
      await updatedVeterinary(editingVeterinary, veterinaryData);
      setEditingVeterinary(null);
    } else {
      await registerVeterinary(veterinaryData);
    }
    await getAllVeterinaries();
    formRef.current.reset();
    setUser('');
    setName('');
    setLocation('');
    setSchedule('');
    setDescription('');
    setPet('');
    setVet('');
    setVeterinaryAppointment('');
    setAdoptionAppointment('');
    setReloadComponent(!reloadComponent)
    setShowForm(false);
  };

  const handleEditVeterinary = (veterinary) => {
    setUser(veterinary.user);
    setName(veterinary.name);
    setLocation(veterinary.location);
    setSchedule(veterinary.schedule);
    setDescription(veterinary.description);
    setPet(veterinary.pet);
    setVet(veterinary.vet)
    setVeterinaryAppointment(veterinary.veterinaryAppointment);
    setAdoptionAppointment(veterinary.adoptionAppointment);
    setEditingVeterinary(veterinary._id);
    setShowForm(true);
  };

  const handleAdd = () => {
    setUser('');
    setName('');
    setLocation('');
    setSchedule('');
    setDescription('');
    setPet('');
    setVet('');
    setVeterinaryAppointment('');
    setAdoptionAppointment('');
    setEditingVeterinary(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta clínica veterinaria?')) {
      try {
        await deleteVeterinary(id);
        await getAllVeterinaries();
      } catch (error) {
        alert(`Error al eliminar la clínica veterinaria: ${error.message}`);
      }
    }
  };

  const handleCancel = () => {
    setEditingVeterinary(null);
    setShowForm(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = (getVeterinaries || []).filter(
    (veterinary) =>
      veterinary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veterinary.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veterinary.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veterinary.user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veterinary.pet.namePet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="veterinary-container fade-in">
        <div className="veterinary-title">
          <i className="paw-icon fas fa-paw"></i>
          Clínicas Veterinarias
          <i className="paw-icon fas fa-paw"></i>
          <div className="veterinary-line"></div>
        </div>
        <input
          type="text"
          className="veterinary-search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {showForm && (
          <div className={`veterinary-form-overlay ${showForm ? 'show' : ''}`}>
            <div className="veterinary-form fade-in">
              <div className="veterinary-form-title">
                <i className="paw-icon fas fa-paw"></i>
                {editingVeterinary ? 'Editar Clínica' : 'Agregar Clínica'}
                <i className="paw-icon fas fa-paw"></i>
              </div>
              <div className="veterinary-line"></div>
              <form ref={formRef} onSubmit={handleRegisterVeterinary} className="veterinary-form-content">
                <table>
                  <tbody>
                    <tr>
                      <td><label htmlFor="user">Usuario</label></td>
                      <td>
                        <input
                          id="user"
                          type="text"
                          name="user"
                          placeholder="Usuario"
                          value={user}
                          onChange={(e) => setUser(e.target.value)}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="name">Nombre</label></td>
                      <td>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Nombre"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="location">Ubicación</label></td>
                      <td>
                        <input
                          id="location"
                          type="text"
                          name="location"
                          placeholder="Ubicación"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="schedule">Horario</label></td>
                      <td>
                        <input
                          id="schedule"
                          type="text"
                          name="schedule"
                          placeholder="Horario"
                          value={schedule}
                          onChange={(e) => setSchedule(e.target.value)}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="description">Descripción</label></td>
                      <td>
                        <textarea
                          id="description"
                          name="description"
                          placeholder="Descripción"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="pet">Mascota</label></td>
                      <td>
                        <input
                          id="pet"
                          type="text"
                          name="pet"
                          placeholder="Mascota"
                          value={pet}
                          onChange={(e) => setPet(e.target.value)}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="vet">Veterinario</label></td>
                      <td>
                        <input
                          id="vet"
                          type="text"
                          name="vet"
                          placeholder="Veterinario"
                          value={vet}
                          onChange={(e) => setVet(e.target.value)}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="veterinaryAppointment">Cita Veterinaria</label></td>
                      <td>
                        <input
                          id="veterinaryAppointment"
                          type="text"
                          name="veterinaryAppointment"
                          placeholder="Cita Veterinaria"
                          value={veterinaryAppointment}
                          onChange={(e) => setVeterinaryAppointment(e.target.value)}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="adoptionAppointment">Cita de Adopción</label></td>
                      <td>
                        <input
                          id="adoptionAppointment"
                          type="text"
                          name="adoptionAppointment"
                          placeholder="Cita de Adopción"
                          value={adoptionAppointment}
                          onChange={(e) => setAdoptionAppointment(e.target.value)}
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="veterinary-buttons">
                  <button className="veterinary-submit" type="submit">
                    {editingVeterinary ? 'Actualizar' : 'Guardar'}
                  </button>
                  <button className="veterinary-cancel" type="button" onClick={handleCancel}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {isFetching ? (
          <div>Cargando ... </div>
        ) : (
          <div className="veterinary-list-container">
            <table className="veterinary-list">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Ubicación</th>
                  <th>Horario</th>
                  <th>Descripción</th>
                  <th>Mascota</th>
                  <th>Veterinario</th>
                  <th>Cita Veterinaria</th>
                  <th>Cita de Adopción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((veterinary, index) => (
                    <tr key={veterinary._id || index} onClick={() => handleEditVeterinary(veterinary)}>
                      <td>{veterinary.user.name} {veterinary.user.surname}</td>
                      <td>{veterinary.name}</td>
                      <td>{veterinary.location}</td>
                      <td>{veterinary.schedule}</td>
                      <td>{veterinary.description}</td>
                      <td>{veterinary.pet.namePet}</td>
                      <td>{veterinary.vet ? `${veterinary.vet.name} ${veterinary.vet.surname}` : 'N/A'}</td>
                      <td>{veterinary.veterinaryAppointment}</td>
                      <td>{veterinary.adoptionAppointment}</td>
                      <td>
                        <button className='edit-btn' onClick={(e) => { e.stopPropagation(); handleEditVeterinary(veterinary) }}>Editar</button>
                        <button className='delete-btn' onClick={(e) => { e.stopPropagation(); handleDelete(veterinary._id) }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">No hay clínicas registradas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <button className="add-button" onClick={handleAdd}>Agregar Clínica</button>
      </div>
    </>
  );
};