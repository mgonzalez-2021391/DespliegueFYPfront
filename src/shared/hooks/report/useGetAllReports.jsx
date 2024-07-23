import { useState, useCallback } from 'react'
import toast from 'react-hot-toast';
import { getReportsRequest } from '../../../services/api';

export const useGetAllReports = () => {
    const [getReports, setGetReports] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const getAllReports = useCallback(async () => {
        setIsFetching(true);
        setError(null);
        try {
            const response = await getReportsRequest();
            if (response.error) {
                toast.error(response.err.message || 'Error al obtener los reportes');
                setError(response.err)
            } else {
                console.log('Reportes obtenidos:', response.reports)
                setGetReports(response.reports)
            }
        } catch (error) {
            toast.error('Error al obtener los reportes');
            setError(error)
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        getReports,
        isFetching,
        error,
        getAllReports,
    };
};