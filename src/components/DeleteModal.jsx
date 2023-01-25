import React, { useState } from 'react';
import closeIcon from '../assets/icons/close.svg';
import Button from './common/Button';
import Loader from './common/Loader';

export default function DeleteModal({ onCloseDelete, onPostDelete }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePostDelete = () => {
    setIsLoading(true);
    onPostDelete();
  };

  return (
    <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-gray-300 bg-opacity-50 p-5">
      <div className="w-80 max-w-lg rounded-lg border-2 border-black bg-white p-6">
        <div className="mb-3 flex items-center justify-end">
          <img
            onClick={onCloseDelete}
            className="h-6 w-6 cursor-pointer"
            src={closeIcon}
            alt=""
          />
        </div>
        <h2 className="mb-5 w-full text-center text-3xl text-gray-700">
          Are you sure?
        </h2>

        {isLoading && (
          <div className="m-2 text-center">
            <Loader />
          </div>
        )}

        <div className="flex items-center justify-around">
          <Button
            onClick={handlePostDelete}
            type="button"
            text="Yes"
            variant="secondary"
            disabled={isLoading}
          />
          <Button
            onClick={onCloseDelete}
            type="button"
            text="No"
            variant="secondary"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
