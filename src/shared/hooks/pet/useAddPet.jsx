import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { addPetRequest } from '../../../services/api';

export const useAddPet = () => {
    const [addPet, setAddPet] = useState(false);

    const registerPet = async (petData) => {
        setAddPet(true);
        try {
            const response = await addPetRequest(petData);
            if (response.error) {
                throw new Error(response.error);
            }
            toast.success('Mascota guardada correctamente');
        } catch (error) {
            toast.error('No se pudo guardar la mascota correctamente');
        } finally {
            setAddPet(false);
        }
    };

    return {
        registerPet,
        addPet,
    };
};