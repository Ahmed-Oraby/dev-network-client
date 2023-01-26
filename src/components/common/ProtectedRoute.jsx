import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken } from '../../services/authService';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = getAuthToken();

  window.scrollTo(0, 0);

  if (!token)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return children;
}
