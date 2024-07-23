import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getAllAppointmentsRequest } from '../../../services/api';

export const useGetAllAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const getAllAppointments = useCallback(async () => {
        setIsFetching(true);
        setError(null);
        try {
            const response = await getAllAppointmentsRequest();
            if (response.error) {
                toast.error(response.err.message || 'Error al obtener las citas de adopción');
                setError(response.err);
                setAppointments([]);
            } else {
                setAppointments(response);
            }
        } catch (error) {
            toast.error('Error al obtener las citas de adopción');
            setError(error);
            setAppointments([]);
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        appointments,
        isFetching,
        error,
        getAllAppointments,
    };
};
