import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getPublicationRequest } from '../../../services/api'; // Asegúrate de tener una función para obtener una publicación por ID

export const usePublication = () => {
    const [publication, setPublication] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const getPublication = useCallback(async (id) => {
        setIsFetching(true);
        setError(null);
        try {
            const response = await getPublicationRequest(id);
            if (response.error) {
                toast.error(response.error.message || 'Error al obtener la publicación');
                setError(response.error);
            } else {
                setPublication(response.publication);
            }
        } catch (error) {
            toast.error('Error al obtener la publicación');
            setError(error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        publication,
        isFetching,
        error,
        getPublication
    };
};
