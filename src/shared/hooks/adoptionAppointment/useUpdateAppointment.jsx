import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { updateAppointmentRequest } from '../../../services/api'; // Ajusta la ruta según sea necesario

export const useUpdateAppointment = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const updatedAppointment = useCallback(async (appointmentId, appointmentData) => {
        setIsFetching(true);
        setError(null);
        try {
            const response = await updateAppointmentRequest(appointmentId, appointmentData);
            if (response.error) {
                toast.error(response.err.message || 'Error al actualizar la cita de adopción');
                setError(response.err);
            } else {
                toast.success('Cita de adopción actualizada exitosamente');
            }
        } catch (error) {
            toast.error('Error al actualizar la cita de adopción');
            setError(error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        updatedAppointment,
        isFetching,
        error,
    };
};
