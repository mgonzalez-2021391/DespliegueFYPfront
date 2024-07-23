import { updateReportRequest } from '../../../services/api';

export const useUpdateReport = () => {
  const updatedReport = async (id, reportData) => {
    const result = await updateReportRequest(id, reportData);
    if (result.error) {
      console.error(result.err);
    }
    return result;
  };

  return {
    updatedReport
  };
};
