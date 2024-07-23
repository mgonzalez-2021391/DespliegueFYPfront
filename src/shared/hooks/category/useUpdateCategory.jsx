import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateCategoryRequest } from '../../../services/api';

export const useUpdateCategory = () => {
    const [updateCategory, setUpdateCategory] = useState(null);

    const updatedCategory = async (id, categoryData) => {
        const response = await updateCategoryRequest(id, categoryData);
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar la categoría'
            );
        } else {
            setUpdateCategory(response.data);
            toast.success('Categoría actualizada correctamente');
        }
    }

    return {
        updateCategory,
        isFetching: !updatedCategory,
        updatedCategory,
    }
}