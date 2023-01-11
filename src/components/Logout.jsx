import React from 'react';
import { Navigate } from 'react-router-dom';
import { removeToken, getTokenData } from '../services/authService';
import Button from './common/Button';

export default function Logout() {
  function handleLogout() {
    removeToken();
    window.location.replace('/login');
  }

  const tokenData = getTokenData();
  if (!tokenData) return <Navigate to="/login" replace />;

  return (
    <div className="mx-auto mt-10 max-w-sm rounded-md border-2 border-black p-6 shadow-lg">
      <h2 className="mb-5 w-full text-center text-3xl text-gray-700">
        Are you sure?
      </h2>
      <Button type="button" text="Logout" onClick={handleLogout} />
    </div>
  );
}
