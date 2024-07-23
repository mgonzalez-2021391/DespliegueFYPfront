import React, { useEffect, useState, useRef } from 'react';
import './Category.css';
import { useGetAllCategories } from '../../shared/hooks/category/useGetAllCategories';
import { useAddCategory } from '../../shared/hooks/category/useAddCategory';
import { useUpdateCategory } from '../../shared/hooks/category/useUpdateCategory';
import { useDeleteCategory } from '../../shared/hooks/category/useDeleteCategory';
import { Navbar } from '../Navbar/Navbar';

export const Category = () => {
    const { categories, isFetching, getAllCategories } = useGetAllCategories();
    const { registerCategory } = useAddCategory();
    const { updatedCategory } = useUpdateCategory();
    const { deleteCategory } = useDeleteCategory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [reloadComponent, setReloadComponent] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const formRef = useRef(null);

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    const handleRegisterCategory = async (event) => {
        event.preventDefault();
        const categoryData = { name, description };
        if (editingCategory) {
            await updatedCategory(editingCategory, categoryData);
            setEditingCategory(null);
        } else {
            await registerCategory(categoryData);
        }
        await getAllCategories();
        formRef.current.reset();
        setName('');
        setDescription('');
        setReloadComponent(!reloadComponent);
        setShowForm(false);
    };

    const handleEditCategory = (category) => {
        setName(category.name);
        setDescription(category.description);
        setEditingCategory(category._id);
        setShowForm(true);
    };

    const handleAdd = () => {
        setName('');
        setDescription('');
        setEditingCategory(null);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            try {
                await deleteCategory(id);
                await getAllCategories();
            } catch (error) {
                toast.error(`Error al eliminar la categoría: ${error.message}`);
            }
        }
    };

    const handleCancel = () => {
        setEditingCategory(null);
        setShowForm(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className="category-container fade-in">
                <div className="category-title">
                    <i className="paw-icon fas fa-paw"></i>
                    Categorías
                    <i className="paw-icon fas fa-paw"></i>
                    <div className="category-line"></div>
                </div>
                <input
                    type="text"
                    className="category-search"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {showForm && (
                    <div className={`category-form-overlay ${showForm ? 'show' : ''}`}>
                        <div className="category-form fade-in">
                            <div className="category-form-title">
                                <i className="category-icon fas fa-paw"></i>
                                {editingCategory ? 'Editar Categoría' : 'Agregar Categoría'}
                                <i className="category-icon fas fa-paw"></i>
                            </div>
                            <div className="category-line"></div>
                            <form ref={formRef} onSubmit={handleRegisterCategory} className="category-form-content">
                                <div className="category-form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Nombre"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="category-form-group">
                                    <label htmlFor="description">Descripción</label>
                                    <input
                                        id="description"
                                        type="text"
                                        name="description"
                                        placeholder="Descripción"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="category-form-buttons">
                                    <button className="save-btn" type="submit">
                                        {editingCategory ? 'Actualizar' : 'Guardar'}
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
                    <div className="category-table-container">
                        <table className="category-table fade-in">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((category, index) => (
                                        <tr key={category._id || index}>
                                            <td>{category.name}</td>
                                            <td>{category.description}</td>
                                            <td>
                                                <button className="edit-btn" onClick={() => handleEditCategory(category)}>Editar</button>
                                                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(category._id) }}>Eliminar</button>
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
                <button className="category-add-button" onClick={handleAdd}>Agregar</button>
            </div>
        </>
    );
};