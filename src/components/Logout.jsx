import React from 'react';
import { logout } from '../services/authService';
import Button from './common/Button';

export default function Logout() {
  return (
    <div className="mx-auto mt-10 max-w-sm rounded-md border-2 border-black p-6 shadow-lg">
      <h2 className="mb-5 w-full text-center text-3xl text-gray-700">
        Are you sure?
      </h2>
      <Button type="button" text="Logout" variant="primary" onClick={logout} />
    </div>
  );
}
