import { useState } from 'react';
import toast from 'react-hot-toast';
import { deletePetRequest } from '../../../services/api';

export const useDeletePet = () => {
    const [error, setError] = useState(null);

    const deletePet = async (id) => {
        try {
            const response = await deletePetRequest(id);
            if (response.error) {
                setError('Error al eliminar la mascota: ' + response.err.message);
                toast.error('Error al eliminar la mascota');
                return false;
            } else {
                toast.success('Mascota eliminada correctamente');
                return true;
            }
        } catch (error) {
            setError('Error al eliminar la mascota: ' + error.message);
            toast.error('Error al eliminar la mascota');
            return false;
        }
    };

    return {
        deletePet, error, setError
    };
};