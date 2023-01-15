import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../services/authService';

export default function Home() {
  const token = getAuthToken();
  if (token) return <Navigate to="/dashboard" replace />;
  return <div>Home</div>;
}
