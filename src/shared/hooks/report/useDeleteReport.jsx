import { deleteReportRequest } from '../../../services/api';

export const useDeleteReport = () => {
  const deleteReport = async (id) => {
    const result = await deleteReportRequest(id);
    if (result.error) {
      console.error(result.err);
    }
    return result;
  };

  return {
    deleteReport
  };
};
