import { useState } from 'react';
import toast from 'react-hot-toast';
import { addReportRequest } from '../../../services/api';

export const useAddReport = () => {
    const [addReport, setAddReport] = useState(false);

    const registerReport = async (reportData) => {
        setAddReport(true);
        try {
            const response = await addReportRequest(reportData);
            if (response.error) {
                throw new Error(response.error);
            }
            toast.success('Reporte guardado correctamente');
        } catch (error) {
            toast.error('No se pudo guardar el reporte correctamente');
        } finally {
            setAddReport(false);
        }
    }

    return {
        registerReport,
        addReport,
    }
}
