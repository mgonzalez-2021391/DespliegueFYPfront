import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getCategoriesRequest } from '../../../services/api';

export const useGetAllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const getAllCategories = useCallback(async () => {
        setIsFetching(true);
        setError(null);
        try {
            const response = await getCategoriesRequest();
            if (response.error) {
                toast.error(response.err.message || 'Error al obtener las categorías');
                setError(response.err);
                setCategories([]); // Asegúrate de reiniciar el estado
            } else {
                setCategories(response); // Asegúrate de establecer el estado correctamente
            }
        } catch (error) {
            toast.error('Error al obtener las categorías');
            setError(error);
            setCategories([]); // Asegúrate de reiniciar el estado
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        categories, // Renombrado para mejor comprensión
        isFetching,
        error,
        getAllCategories,
    };
};