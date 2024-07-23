import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getPetsRequest } from '../../../services/api';

export const useGetAllPets = () => {
    const [getPets, setGetPets] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const getAllPets = useCallback(async () => {
        setIsFetching(true);
        setError(null);
        try {
            const response = await getPetsRequest();
            if (response.error) {
                toast.error(response.err.message || 'Error al obtener las mascotas');
                setError(response.err);
            } else {
                console.log('Mascotas obtenidas:', response.pets);
                setGetPets(response.pets);
            }
        } catch (error) {
            toast.error('Error al obtener las mascotas');
            setError(error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        getPets,
        isFetching,
        error,
        getAllPets
    };
};