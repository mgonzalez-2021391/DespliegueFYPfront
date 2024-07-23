import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { addAppointmentRequest } from '../../../services/api'; 

export const useAddAppointment = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const registerAppointment = useCallback(async (appointmentData) => {
        setIsFetching(true);
        setError(null);
        try {
            const response = await addAppointmentRequest(appointmentData);
            if (response.error) {
                toast.error(response.err.message || 'Error al registrar la cita de adopción');
                setError(response.err);
            } else {
                toast.success('Cita de adopción registrada exitosamente');
            }
        } catch (error) {
            toast.error('Error al registrar la cita de adopción');
            setError(error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        registerAppointment,
        isFetching,
        error,
    };
};
