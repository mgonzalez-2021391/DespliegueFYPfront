import React, { useEffect, useState, useRef } from 'react';
import './PetAdmin.css';
import { useGetAllPets } from '../../shared/hooks/pet/useGetAllPets.jsx';
import { useAddPet } from '../../shared/hooks/pet/useAddPet.jsx';
import { useUpdatePet } from '../../shared/hooks/pet/useUpdatePet.jsx';
import { useDeletePet } from '../../shared/hooks/pet/useDeletePet.jsx';
import { Navbar } from '../Navbar/Navbar.jsx';

const ImageModal = ({ imageSrc, onClose }) => {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Pet" className="large-image" />
        <button className="close-btn-large" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export const PetAdmin = () => {
  const { getPets, isFetching, getAllPets } = useGetAllPets();
  const { registerPet } = useAddPet();
  const { updatedPet } = useUpdatePet();
  const { deletePet } = useDeletePet();

  const [namePet, setNamePet] = useState('');
  const [race, setRace] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [formData, setFormData] = useState({ namePet: '', race: '', gender: '', age: '', description: '', image: '' });
  const [editingPet, setEditingPet] = useState(null);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewImage, setViewImage] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    getAllPets();
  }, [getAllPets]);

  const handleRegisterPet = async (event) => {
    event.preventDefault();
    const petData = { namePet, race, gender, age, description, image };
    if (editingPet) {
      await updatedPet(editingPet, petData);
      setEditingPet(null);
    } else {
      await registerPet(petData);
    }
    await getAllPets();
    formRef.current.reset();
    setNamePet('');
    setRace('');
    setGender('');
    setAge('');
    setDescription('');
    setImage('');
    setReloadComponent(!reloadComponent);
    setShowForm(false);
  };

  const handleEditPet = (pet) => {
    setNamePet(pet.namePet);
    setRace(pet.race);
    setGender(pet.gender);
    setAge(pet.age);
    setDescription(pet.description);
    setImage(pet.image);
    setEditingPet(pet._id);
    setShowForm(true);
  };

  const handleAdd = () => {
    setNamePet('');
    setRace('');
    setGender('');
    setAge('');
    setDescription('');
    setImage('');
    setEditingPet(null);
    setShowForm(true);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]{0,8}$/.test(value)) {
      setAge(value);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      try {
        await deletePet(id);
        await getAllPets();
      } catch (error) {
        console.error(`Error al eliminar la mascota: ${error.message}`);
      }
    }
  };

  const handleCancel = () => {
    setEditingPet(null);
    setShowForm(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewImage = (image) => {
    setViewImage(image);
  };

  const filteredData = getPets.filter((pet) =>
    pet.namePet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.race.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.age.toString().includes(searchTerm.toLowerCase()) ||
    pet.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar />
    <div className="pet-container fade-in">
      <div className="pet-title">
        <i className="paw-icon fas fa-paw"></i>
        Administración de Mascotas
        <i className="paw-icon fas fa-paw"></i>
        <div className="pet-line"></div>
      </div>
      <input
        type="text"
        className="pet-search"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {showForm && (
        <div className={`pet-form-overlay ${showForm ? 'show' : ''}`}>
          <div className="pet-form fade-in">
            <div className="pet-form-title">
              <i className="paw-icon fas fa-paw"></i>
              {editingPet ? 'Editar Mascota' : 'Agregar Mascota'}
              <i className="paw-icon fas fa-paw"></i>
            </div>
            <div className="pet-line"></div>
            <form ref={formRef} onSubmit={handleRegisterPet} className="pet-form-content">
              <div className="pet-form-group">
                <label htmlFor="namePet">Nombre de la mascota</label>
                <input
                  id="namePet"
                  type="text"
                  name="namePet"
                  placeholder="Nombre de la mascota"
                  value={namePet}
                  onChange={(e) => setNamePet(e.target.value)}
                  required
                />
              </div>
              <div className="pet-form-group">
                <label htmlFor="race">Raza</label>
                <input
                  id="race"
                  type="text"
                  name="race"
                  placeholder="Raza"
                  value={race}
                  onChange={(e) => setRace(e.target.value)}
                  required
                />
              </div>
              <div className="pet-form-group">
                <label htmlFor="gender">Género</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Selecciona el género</option>
                  <option value="Masculino">Macho</option>
                  <option value="Femenino">Hembra</option>
                </select>
              </div>
              <div className="pet-form-group">
                <label htmlFor="age">Edad</label>
                <input
                  id="age"
                  type="text"
                  name="age"
                  placeholder="Edad"
                  value={age}
                  onChange={handlePhoneNumberChange}
                  maxLength='2'
                  required
                />
              </div>
              <div className="pet-form-group">
                <label htmlFor="description">Descripción (máx. 80 caracteres)</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Descripción (máx. 80 caracteres)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength="80"
                  required
                ></textarea>
              </div>
              <div className="pet-form-group">
                <label htmlFor="image">URL de la imagen</label>
                <input
                  id="image"
                  type="text"
                  name="image"
                  placeholder="URL de la imagen"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <div className="pet-form-buttons">
                <button className="save-btn" type="submit">
                  {editingPet ? 'Actualizar' : 'Guardar'}
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
        <div className="pet-table-container">
          <table className="pet-table fade-in">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Raza</th>
                <th>Género</th>
                <th>Edad</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((pet, index) => (
                  <tr key={pet._id || index} onClick={() => handleEditPet(pet)}>
                    <td>{pet.namePet}</td>
                    <td>{pet.race}</td>
                    <td>{pet.gender}</td>
                    <td>{pet.age}</td>
                    <td className="description">{pet.description}</td>
                    <td>
                      <button className="view-image-btn" onClick={(e) => { e.stopPropagation(); handleViewImage(pet.image); }}>Ver Imagen</button>
                    </td>
                    <td>
                      <button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleEditPet(pet); }}>Editar</button>
                      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(pet._id); }}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: '#fff' }}>No se encontraron datos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <button className="pet-add-button" onClick={handleAdd}>Agregar</button>
      {viewImage && <ImageModal imageSrc={viewImage} onClose={() => setViewImage(null)} />}
    </div>
    </>
  );
};