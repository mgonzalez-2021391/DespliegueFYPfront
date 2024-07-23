import { useState } from 'react';
import toast from 'react-hot-toast';
import { updatePetRequest } from '../../../services/api';

export const useUpdatePet = () => {
    const [updatePet, setUpdatePet] = useState(null);

    const updatedPet = async (id, petData) => {
        try {
            const response = await updatePetRequest(id, petData);
            if (response.error) {
                throw new Error(response.error.message || 'Error al actualizar la mascota');
            }
            toast.success('Mascota actualizada correctamente');
            setUpdatePet(response.data);
        } catch (error) {
            toast.error('Error al actualizar la mascota');
            console.error('Error al actualizar la mascota:', error);
        }
    };

    return {
        updatedPet,
        isFetching: !updatePet,
    };
};
