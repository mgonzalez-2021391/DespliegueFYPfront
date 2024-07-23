import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { deleteAppointmentRequest } from '../../../services/api'; 

export const useDeleteAppointment = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const deleteAppointment = useCallback(async (appointmentId) => {
        setIsFetching(true);
        setError(null);
        try {
            const response = await deleteAppointmentRequest(appointmentId);
            if (response.error) {
                toast.error(response.err.message || 'Error al eliminar la cita de adopción');
                setError(response.err);
            } else {
                toast.success('Cita de adopción eliminada exitosamente');
            }
        } catch (error) {
            toast.error('Error al eliminar la cita de adopción');
            setError(error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        deleteAppointment,
        isFetching,
        error,
    };
};
