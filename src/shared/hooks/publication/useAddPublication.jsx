import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { addPublicationRequest } from '../../../services/api';

export const useAddPublication = () => {
    const [addPublication, setAddPublication] = useState(false);

    const registerPublication = async (publicationData) => {
        setAddPublication(true);
        try {
            const response = await addPublicationRequest(publicationData);
            if (response.error) {
                throw new Error(response.error);
            }
            toast.success('Publication successfully saved');
        } catch (error) {
            toast.error('The publication could not be saved correctly');
        } finally {
            setAddPublication(false);
        }
    };

    return {
        registerPublication,
        addPublication,
    };
};
