import React from 'react';
import { Navigate } from 'react-router-dom';

const HomeChange = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role == 'CLIENT') {
    return <Navigate to="/HomeC" />;
  }

  if (user.role == 'ADMIN') {
    return <Navigate to="/Home" />;
  }

  return children;
};

export default HomeChange;
