import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateVeterinaryRequest } from '../../../services/api';

export const useUpdateVeterinary = () => {
  const [updateVeterinary, setUpdateVeterinary] = useState(null);

  const updatedVeterinary = async (id, veterinaryData) => {
    const response = await updateVeterinaryRequest(id, veterinaryData)
    if (response.error) {
      toast.error(
        response?.err?.response?.data?.message ||
        'Error al actualizar la veterinaria'
      )
    }
    setUpdateVeterinary(response.data)
    toast.success('Actualizado correctamente')
  }
  return {
    updateVeterinary,
    isFetching: !updatedVeterinary,
    updatedVeterinary,
  };
};