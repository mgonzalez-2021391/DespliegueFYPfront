import { useState } from 'react';
import toast from 'react-hot-toast';
import { addCategoryRequest } from '../../../services/api';

export const useAddCategory = () => {
    const [addCategory, setAddCategory] = useState(false);

    const registerCategory = async (categoryData) => {
        setAddCategory(true);
        try {
            const response = await addCategoryRequest(categoryData);
            if (response.error) {
                throw new Error(response.error);
            }
            toast.success('Categoría guardada correctamente');
        } catch (error) {
            toast.error('No se pudo guardar la categoría correctamente');
        } finally {
            setAddCategory(false);
        }
    }

    return {
        registerCategory,
        addCategory,
    }
}