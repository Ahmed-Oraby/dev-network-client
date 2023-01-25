import React, { useState } from 'react';
import Button from './common/Button';
import closeIcon from '../assets/icons/close.svg';
import Loader from './common/Loader';

export default function EditModal({ text, onCloseEdit, onSaveEdit }) {
  const [value, setValue] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  const handlePostEdit = () => {
    setIsLoading(true);
    onSaveEdit(value);
  };

  return (
    <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-gray-300 bg-opacity-50 p-5">
      <div className="w-96 max-w-lg rounded-lg border-2 border-black bg-white p-6">
        <div className="mb-3 flex items-center justify-end">
          <img
            onClick={onCloseEdit}
            className="h-6 w-6 cursor-pointer"
            src={closeIcon}
            alt=""
          />
        </div>
        <textarea
          onChange={(e) => setValue(e.target.value)}
          value={value}
          autoFocus
          className="w-full resize-none rounded-md border-2 border-gray-400 p-2 text-gray-700 outline-none focus:border-blue-500"
          cols="30"
          rows="10"
        ></textarea>

        {isLoading && (
          <div className="m-2 text-center">
            <Loader />
          </div>
        )}

        <div className="flex items-center justify-around">
          <Button
            onClick={handlePostEdit}
            type="button"
            text="Save"
            variant="secondary"
            disabled={isLoading}
          />
          <Button
            onClick={onCloseEdit}
            type="button"
            text="Cancel"
            variant="secondary"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
