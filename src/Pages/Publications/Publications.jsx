import React, { useEffect, useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import './Publications.css';
import { useGetAllPublications } from '../../shared/hooks/publication/useGetAllPublication';
import { NavbarC } from '../NavbarC/NavbarC';

export const Publications = () => {
    const { getPublications, isFetching, error, getAllPublications, setGetPublications } = useGetAllPublications();
    const [selectedPublication, setSelectedPublication] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const userName = "Usuario";

    useEffect(() => {
        getAllPublications();
    }, [getAllPublications]);

    const handleViewMore = (id) => {
        const publication = getPublications.find(pub => pub.id === id);
        setSelectedPublication(publication);
        console.log('Selected publication:', publication);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const updatedPublications = getPublications.map(pub => {
                if (pub.id === selectedPublication.id) {
                    return {
                        ...pub,
                        comments: [...(pub.comments || []), { name: userName, text: newComment }]
                    };
                }
                return pub;
            });
            setGetPublications(updatedPublications);
            setSelectedPublication({
                ...selectedPublication,
                comments: [...(selectedPublication.comments || []), { name: userName, text: newComment }]
            });
            setNewComment("");
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPublications = getPublications.filter(pub =>
        (pub.title?.toLowerCase().includes(searchTerm.toLowerCase()) || pub.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        console.log('Filtered publications:', filteredPublications);
    }, [filteredPublications]);

    if (isFetching) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (selectedPublication) {
        const filteredSuggestions = filteredPublications.filter(pub => pub.id !== selectedPublication.id);
        console.log('Filtered suggestions:', filteredSuggestions);

        return (
            <>
                <NavbarC />
                <div className="main-container" style={{ flexGrow: 1 }}>
                    <div className="publication-content-container" style={{ flexGrow: 1 }}>
                        <div className="publication-content" style={{ flexGrow: 1, minHeight: '70vh', position: 'relative' }}>
                            <button className="close-btn" onClick={() => setSelectedPublication(null)}>✖</button>
                            <h2>{selectedPublication.title}</h2>
                            {selectedPublication.imageUrl && (
                                <img src={selectedPublication.imageUrl} alt={selectedPublication.title} className="publication-image" />
                            )}
                            <p>{selectedPublication.description}</p>
                            <div className="comments-section">
                                <h3>Comentarios</h3>
                                <div className="comments-list">
                                    {selectedPublication.comments && selectedPublication.comments.map((comment, index) => (
                                        <div key={index} className="comment">
                                            <strong>{comment.name}</strong>
                                            <p>{comment.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Escribe tu comentario"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button onClick={handleAddComment}>Enviar</button>
                            </div>
                            <div className="suggestions-container">
                                <h3>Sugerencias</h3>
                                <div className="suggestions-list">
                                    {filteredSuggestions.map(pub => (
                                        <div key={pub.id} className="suggestion-card fade-in">
                                            <h2>{pub.title}</h2>
                                            {pub.imageUrl && (
                                                <img src={pub.imageUrl} alt={pub.title} className="suggestion-image" />
                                            )}
                                            <p>{pub.description ? pub.description.substring(0, 100) : ''}...</p>
                                            <button onClick={() => handleViewMore(pub.id)}>Ver más</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="main-container" style={{ flexGrow: 1 }}>
                <div className="publications-container">
                    <div className="publications-title">
                        <i className="paw-icon fas fa-paw"></i>
                        Publicaciones
                        <i className="paw-icon fas fa-paw"></i>
                        <div className="publications-line"></div>
                    </div>
                    <input
                        type="text"
                        className="publications-search"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className="publications-list">
                        {filteredPublications.map(pub => (
                            <div key={pub.id} className="publication-card fade-in">
                                <h2>{pub.title}</h2>
                                {pub.imageUrl && (
                                    <img src={pub.imageUrl} alt={pub.title} className="publication-image" />
                                )}
                                <p>{pub.description ? pub.description.substring(0, 100) : ''}</p>
                                <button onClick={() => handleViewMore(pub.id)}>Ver más</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};