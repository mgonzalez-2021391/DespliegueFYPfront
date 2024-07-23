import { useState } from 'react';
import toast from 'react-hot-toast';
import { deletePublicationRequest } from '../../../services/api';

export const useDeletePublication = () => {
    const [error, setError] = useState(null);

    const deletePublication = async (id) => {
        try {
            const response = await deletePublicationRequest(id);
            if (response.error) {
                setError('Error al eliminar la publicación: ' + response.err.message);
                toast.error('Error al eliminar la publicación');
                return false;
            } else {
                toast.success('Publicación eliminada correctamente');
                return true;
            }
        } catch (error) {
            setError('Error al eliminar la publicación: ' + error.message);
            toast.error('Error al eliminar la publicación');
            return false;
        }
    };
    return {
        deletePublication, error, setError
    };
};
