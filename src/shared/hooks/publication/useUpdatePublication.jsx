import { useState } from 'react';
import toast from 'react-hot-toast';
import { updatePublicationRequest } from '../../../services/api';

export const useUpdatePublication = () => {
    const [updatePublication, setUpdatePublication] = useState(null);

    const updatedPublication = async (id, publicationData) => {
        const response = await updatePublicationRequest(id, publicationData);
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar la publicación'
            );
        }
        setUpdatePublication(response.data);
        toast.success('Publicación actualizada correctamente');
    };
    return {
        updatePublication,
        isFetching: !updatedPublication,
        updatedPublication
    };
};
