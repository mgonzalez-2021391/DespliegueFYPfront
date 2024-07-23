import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteCategoryRequest } from '../../../services/api';

export const useDeleteCategory = () => {
    const [error, setError] = useState(null);

    const deleteCategory = async (id) => {
        try {
            const response = await deleteCategoryRequest(id);
            if (response.error) {
                setError('Error al eliminar la categoría: ' + response.err.message);
                toast.error('Error al eliminar la categoría');
                return false;
            } else {
                toast.success('Categoría eliminada correctamente');
                return true;
            }
        } catch (error) {
            setError('Error al eliminar la categoría: ' + error.message);
            toast.error('Error al eliminar la categoría');
            return false;
        }
    }

    return {
        deleteCategory,
        error,
        setError,
    }
}