import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../../services/api';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (name, surname, username, email, password, phone) => {
    setIsLoading(true);
    const user = { name, surname, username, email, password, phone };
    const response = await registerRequest(user);
    setIsLoading(false);
    if (response.error) {
      return toast.error(response?.err?.response?.data?.message || 'Error registering data. Try again.');
    }
    toast.success('Register was successful');
    navigate('/');
  };

  return {
    register,
    isLoading,
  };
};
