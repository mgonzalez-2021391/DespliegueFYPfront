import { useEffect, useState, useRef } from 'react';
import './Report.css';
import { useGetAllReports } from '../../shared/hooks/report/useGetAllReports.jsx';
import { useAddReport } from '../../shared/hooks/report/useAddReport.jsx';
import { useUpdateReport } from '../../shared/hooks/report/useUpdateReport.jsx';
import { useDeleteReport } from '../../shared/hooks/report/useDeleteReport.jsx';
import { Navbar } from '../Navbar/Navbar.jsx';
import { NavbarC } from '../NavbarC/NavbarC.jsx';

export const Report = () => {
    const { getReports, isFetching, getAllReports } = useGetAllReports();
    const { registerReport } = useAddReport();
    const { updatedReport } = useUpdateReport();
    const { deleteReport } = useDeleteReport();

    const [formData, setFormData] = useState({ user: '', phoneNumber: '', location: '', namePet: '', description: '' });
    const [editingReport, setEditingReport] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const tableContainerRef = useRef(null);

    const formRef = useRef(null);

    useEffect(() => {
        getAllReports();
    }, [getAllReports]);

    const handleRegisterReport = async (event) => {
        event.preventDefault();
        if (editingReport) {
            await updatedReport(editingReport, formData);
            setEditingReport(null);
        } else {
            await registerReport(formData);
        }
        await getAllReports();
        formRef.current.reset();
        setFormData({ user: '', phoneNumber: '', location: '', namePet: '', description: '' });
        setShowForm(false);
    };

    const handleEditReport = (report) => {
        setFormData({
            user: report.user._id, // Aseguramos que `user` contenga el _id del usuario
            phoneNumber: report.phoneNumber,
            location: report.location,
            namePet: report.namePet,
            description: report.description
        });
        setEditingReport(report._id);
        setShowForm(true);
    };

    const handleAdd = () => {
        setFormData({ user: '', phoneNumber: '', location: '', namePet: '', description: '' });
        setEditingReport(null);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
            try {
                saveScrollPosition();
                await deleteReport(id);
                await getAllReports();
                restoreScrollPosition();
            } catch (error) {
                console.error(`Error al eliminar el reporte: ${error.message}`);
            }
        }
    };

    const handleCancel = () => {
        setEditingReport(null);
        setShowForm(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const saveScrollPosition = () => {
        if (tableContainerRef.current) {
            sessionStorage.setItem('scrollPosition', tableContainerRef.current.scrollTop);
        }
    };

    const restoreScrollPosition = () => {
        if (tableContainerRef.current) {
            const scrollPosition = sessionStorage.getItem('scrollPosition');
            if (scrollPosition) {
                tableContainerRef.current.scrollTop = scrollPosition;
            }
        }
    };

    const filteredData = getReports.filter((report) =>
        report.user._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.namePet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <NavbarC />
            <div className="report-container fade-in">
                <div className="report-title">
                    <i className="paw-icon fas fa-paw"></i>
                    Reportes
                    <i className="paw-icon fas fa-paw"></i>
                    <div className="report-line"></div>
                </div>
                <input
                    type="text"
                    className="report-search"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {showForm && (
                    <div className={`report-form-overlay ${showForm ? 'show' : ''}`}>
                        <div className="report-form fade-in">
                            <div className="report-form-title">
                                <i className="paw-icon fas fa-paw"></i>
                                {editingReport ? 'Editar Reporte' : 'Agregar Reporte'}
                                <i className="paw-icon fas fa-paw"></i>
                            </div>
                            <div className="report-line"></div>
                            <form ref={formRef} onSubmit={handleRegisterReport} className="report-form-content">
                                
                                <div className="report-form-group">
                                    <label htmlFor="phoneNumber">Número de Teléfono</label>
                                    <input
                                        id="phoneNumber"
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Número de Teléfono"
                                        value={formData.phoneNumber}
                                        maxLength='8'
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="report-form-group">
                                    <label htmlFor="location">Ubicación</label>
                                    <input
                                        id="location"
                                        type="text"
                                        name="location"
                                        placeholder="Ubicación"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="report-form-group">
                                    <label htmlFor="namePet">Nombre de la Mascota</label>
                                    <input
                                        id="namePet"
                                        type="text"
                                        name="namePet"
                                        placeholder="Nombre de la Mascota"
                                        value={formData.namePet}
                                        onChange={(e) => setFormData({ ...formData, namePet: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="report-form-group">
                                    <label htmlFor="description">Descripción</label>
                                    <input
                                        id="description"
                                        type="text"
                                        name="description"
                                        placeholder="Descripción"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="report-form-buttons">
                                    <button className="save-btn" type="submit">
                                        {editingReport ? 'Actualizar' : 'Guardar'}
                                    </button>
                                    <button className="cancel-btn" type="button" onClick={handleCancel}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {isFetching ? (
                    <div>Cargando...</div>
                ) : (
                    <div className="report-table-container" ref={tableContainerRef}>
                        <table className="report-table fade-in">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Número de Teléfono</th>
                                    <th>Ubicación</th>
                                    <th>Nombre de la Mascota</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData && filteredData.length > 0 ? (
                                    filteredData.map((report, index) => (
                                        <tr key={report._id || index} onClick={() => handleEditReport(report)}>
                                            <td>{report.user.name}</td>
                                            <td>{report.phoneNumber}</td>
                                            <td>{report.location}</td>
                                            <td>{report.namePet}</td>
                                            <td>{report.description}</td>
                                            <td>
                                                <button className="edit-btn" onClick={() => handleEditReport(report)}>Editar</button>
                                                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(report._id); }}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No hay reportes disponibles.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                <button className="report-add-button" onClick={handleAdd}>Agregar Reporte</button>
            </div>
        </>
    );
};
