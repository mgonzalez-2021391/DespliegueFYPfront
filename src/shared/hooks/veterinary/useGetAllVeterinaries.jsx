import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getVeterinariesRequest } from '../../../services/api';

export const useGetAllVeterinaries = () => {
  const [getVeterinaries, setGetVeterinaries] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null)

  const getAllVeterinaries = useCallback(async () => {
    setIsFetching(true);
    setError(null)
    try {
      const response = await getVeterinariesRequest()
      if (response.error) {
        toast.error(response.err.message || 'Error al obtener los veterinarios')
        setError(response.err)
      } else {
        console.log('Veterinarios obtenidos:', response.veterinaries)
        setGetVeterinaries(response.veterinaries);
      }
    } catch (error) {
      toast.error('Error al obtener los veterinarios')
      setError(error)
    } finally {
      setIsFetching(false);
    }
  }, []);

  return {
    getVeterinaries,
    isFetching,
    error,
    getAllVeterinaries
  };
};