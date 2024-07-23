import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getPublicationsRequest } from '../../../services/api';

export const useGetAllPublications = () => {
    const [getPublications, setGetPublications] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const getAllPublications = useCallback(async () => {
        setIsFetching(true);
        setError(null);
        try {
            const response = await getPublicationsRequest();
            if (response.error) {
                toast.error(response.error.message || 'Error al obtener las publicaciones');
                setError(response.error);
            } else {
                console.log('Publications fetched:', response.publications);
                setGetPublications(response.publications);
            }
        } catch (error) {
            toast.error('Error al obtener las publicaciones');
            setError(error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        getPublications,
        isFetching,
        error,
        getAllPublications,
        setGetPublications
    };
};
