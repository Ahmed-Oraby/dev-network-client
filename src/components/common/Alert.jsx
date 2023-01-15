import React from 'react';

export default function Alert({ text, variant = 'primary' }) {
  const alertClasses = {
    primary: 'bg-blue-100 text-blue-700',
    danger: 'bg-red-100 text-red-700',
    sucess: 'bg-green-100 text-green-700',
  };

  return (
    <div
      className={`${alertClasses[variant]} m-4 mx-auto w-full max-w-sm rounded-lg p-5 text-center text-base`}
    >
      {text}
    </div>
  );
}
