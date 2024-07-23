import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://despliegue-fyp-back.vercel.app",
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export const loginRequest = async (credentials) => {
  try {
    return await apiClient.post('/fyp/user/login', credentials);
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const registerRequest = async (user) => {
  try {
    return await apiClient.post('/fyp/user/registerClient', user);
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const getVetsRequest = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found in localStorage');
    return { error: true, err: new Error('Token not found') };
  }
  try {
    console.log('Sending request with token:', token);
    const response = await apiClient.get('/fyp/vet/getAll', {
      headers: { authorization: token }
    });
    return response.data;
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const addVetRequest = async (vetData) => {
  try {
    const response = await apiClient.post('/fyp/vet/add', vetData);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const updateVetRequest = async (id, vetData) => {
  try {
    return await apiClient.put(`/fyp/vet/edit/${id}`, vetData);
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const deleteVetRequest = async (id) => {
  try {
    return await apiClient.delete(`/fyp/vet/delete/${id}`);
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const getPetsRequest = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found in localStorage');
    return { error: true, err: new Error('Token not found') };
  }
  try {
    console.log('Sending request with token:', token);
    const response = await apiClient.get('/fyp/pet/getAll', {
      headers: { authorization: token }
    });
    return response.data;
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const addPetRequest = async (petData) => {
  try {
    const response = await apiClient.post('/fyp/pet/add', petData);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const updatePetRequest = async (id, petData) => {
  try {
    return await apiClient.put(`/fyp/pet/edit/${id}`, petData);
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const deletePetRequest = async (id) => {
  try {
    return await apiClient.delete(`/fyp/pet/delete/${id}`);
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const addCategoryRequest = async (categoryData) => {
  try {
    const response = await apiClient.post('/fyp/category/save', categoryData);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const getCategoriesRequest = async () => {
  try {
    const response = await apiClient.get('/fyp/category/getCategories');
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const updateCategoryRequest = async (id, categoryData) => {
  try {
    const response = await apiClient.put(`/fyp/category/update/${id}`, categoryData);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const deleteCategoryRequest = async (id) => {
  try {
    const response = await apiClient.delete(`/fyp/category/delete/${id}`);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const getReportsRequest = async () => {
  try {
    const response = await apiClient.get('/fyp/report/getAll');
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const addReportRequest = async (reportData) => {
  try {
    const response = await apiClient.post('/fyp/report/createReport', reportData);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const updateReportRequest = async (id, reportData) => {
  try {
    const response = await apiClient.put(`/fyp/report/updateReport/${id}`, reportData);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const deleteReportRequest = async (id) => {
  try {
    const response = await apiClient.delete(`/fyp/report/deleteReport/${id}`);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const getPublicationsRequest = async () => {
  try {
    const response = await apiClient.get('/fyp/publication/listPublications');
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const getPublicationRequest = async (id) => {
  try {
    const response = await apiClient.get(`/fyp/publication/list`, id)
    return response.data
  } catch (err) {
    return {
      error: true,
      err
    }
  }
}

export const addPublicationRequest = async (publicationData) => {
  try {
    const response = await apiClient.post('/fyp/publication/add', publicationData);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const updatePublicationRequest = async (id, publicationData) => {
  try {
    return await apiClient.put(`/fyp/publication/edit/${id}`, publicationData);
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const deletePublicationRequest = async (id) => {
  try {
    return await apiClient.delete(`/fyp/publication/delete/${id}`);
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const getVeterinariesRequest = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found in localStorage');
    return { error: true, err: new Error('Token not found') };
  }
  try {
    console.log('Sending request with token:', token);
    const response = await apiClient.get('/fyp/veterinary/all', {
      headers: { authorization: token }
    });
    return response.data;
  } catch (err) {
    return {
      error: true,
      err
    };
  }
};

export const addVeterinaryRequest = async (veterinaryData) => {
  try {
    const response = await apiClient.post('/fyp/veterinary/add', veterinaryData);
    return response.data;
  } catch (err) {
    console.error('Error al agregar la clínica veterinaria:', err)
    return {
      error: true,
      err: err.response ? err.response.data : err.message,
    };
  }
};

export const updateVeterinaryRequest = async (id, veterinaryData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found in localStorage');
    return { error: true, err: new Error('Token not found') };
  }
  try {
    console.log('Sending request with token:', token);
    const response = await apiClient.put(`/fyp/veterinary/edit/${id}`, veterinaryData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const deleteVeterinaryRequest = async (id) => {
  try {
    const response = await apiClient.delete(`/fyp/veterinary/delete/${id}`);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const getAllAppointmentsRequest = async () => {
  try {
    const response = await axios.get('/api/appointments');
    return response.data;
  } catch (error) {
    return { error: true, err: error };
  }
};

export const addAppointmentRequest = async (appointmentData) => {
  try {
    const response = await axios.post('/api/appointments', appointmentData);
    return response.data;
  } catch (error) {
    return { error: true, err: error };
  }
};

export const updateAppointmentRequest = async (appointmentId, appointmentData) => {
  try {
    const response = await axios.put(`/api/appointments/${appointmentId}`, appointmentData);
    return response.data;
  } catch (error) {
    return { error: true, err: error };
  }
};

export const deleteAppointmentRequest = async (appointmentId) => {
  try {
    const response = await axios.delete(`/api/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    return { error: true, err: error };
  }
};