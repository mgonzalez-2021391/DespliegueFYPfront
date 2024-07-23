import React, { useEffect, useState, useRef } from 'react';
import './PublicationAdmin.css';
import { useAddPublication } from '../../shared/hooks/publication/useAddPublication.jsx';
import { useUpdatePublication } from '../../shared/hooks/publication/useUpdatePublication.jsx';
import { useDeletePublication } from '../../shared/hooks/publication/useDeletePublication.jsx';
import { Navbar } from '../Navbar/Navbar';
import { useGetAllPublications } from '../../shared/hooks/publication/useGetAllPublication.jsx';
import { NavbarC } from '../NavbarC/NavbarC.jsx';

export const PublicationAdmin = () => {
  const { getPublications, isFetching, getAllPublications } = useGetAllPublications();
  const { registerPublication } = useAddPublication();
  const { updatedPublication } = useUpdatePublication();
  const { deletePublication } = useDeletePublication();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingPublication, setEditingPublication] = useState(null);
  const [reloadComponent, setRealoadComponent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const formRef = useRef(null);

  useEffect(() => {
    getAllPublications();
  }, [getAllPublications]);

  const handleRegisterPublication = async (event) => {
    event.preventDefault();
    const publicationData = { title, description, category, imageUrl };
    if (editingPublication) {
      await updatedPublication(editingPublication, publicationData);
      setEditingPublication(null);
    } else {
      await registerPublication(publicationData);
    }
    await getAllPublications();
    formRef.current.reset();
    setTitle('');
    setDescription('');
    setCategory('');
    setImageUrl('');
    setRealoadComponent(!reloadComponent);
    setShowForm(false);
  };

  const handleEditPublication = (publication) => {
    setTitle(publication.title);
    setDescription(publication.description);
    setCategory(publication.category);
    setImageUrl(publication.imageUrl);
    setEditingPublication(publication._id);
    setShowForm(true);
  };

  const handleAdd = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setImageUrl('');
    setEditingPublication(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      try {
        await deletePublication(id);
        await getAllPublications();
      } catch (error) {
        toast.error(`Error al eliminar la publicación: ${error.message}`);
      }
    }
  };

  const handleCancel = () => {
    setEditingPublication(null);
    setShowForm(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = getPublications.filter((publication) =>
    publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publication.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publication.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavbarC />
      <div className="publication-admin-container fade-in">
        <div className="publication-admin-title">
          <i className="paw-icon fas fa-paw"></i>
          Publicaciones
          <i className="paw-icon fas fa-paw"></i>
          <div className="publication-admin-line"></div>
        </div>
        <input
          type="text"
          className="publication-admin-search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {showForm && (
          <div className={`publication-admin-form-overlay ${showForm ? 'show' : ''}`}>
            <div className="publication-admin-form fade-in">
              <div className="publication-admin-form-title">
                <i className="paw-icon fas fa-paw"></i>
                {editingPublication ? 'Editar Publicación' : 'Agregar Publicación'}
                <i className="paw-icon fas fa-paw"></i>
              </div>
              <div className="publication-admin-line"></div>
              <form ref={formRef} onSubmit={handleRegisterPublication} className="publication-admin-form-content">
                <div className="publication-admin-form-group">
                  <label htmlFor="titulo">Título</label>
                  <input
                    id="titulo"
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="publication-admin-form-group">
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="publication-admin-form-group">
                  <label htmlFor="categoria">Categoría</label>
                  <input
                    id="categoria"
                    type="text"
                    name="categoria"
                    placeholder="Categoría"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="publication-admin-form-group">
                  <label htmlFor="imagenUrl">URL de la Imagen</label>
                  <input
                    id="imageUrl"
                    type="text"
                    name="imageUrl"
                    placeholder="URL de la Imagen"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="publication-admin-form-buttons">
                  <button className="save-btn" type="submit">
                    {editingPublication ? 'Actualizar' : 'Guardar'}
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
          <div className="publication-admin-table-container">
            <table className="publication-admin-table fade-in">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((publication, index) => (
                    <tr key={publication._id || index} onClick={() => handleEditPublication(publication)}>
                      <td>{publication.title}</td>
                      <td>{publication.description}</td>
                      <td>{publication.category}</td>
                      <td>
                        <div className="publication-image-container">
                          <img src={publication.imageUrl} alt={publication.title} className="publication-image" />
                        </div>
                      </td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(index)}>Editar</button>
                        <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(publication._id) }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: '#fff' }}>No se encontraron datos</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <button className="publication-admin-add-button" onClick={handleAdd}>Agregar</button>
      </div>
    </>
  );
};