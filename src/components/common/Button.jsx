import React from 'react';

export default function Button({ type, text, onClick }) {
  return (
    <button
      className="mt-7 w-full bg-slate-900 py-3 px-6 font-medium uppercase tracking-wider text-white hover:bg-slate-700"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
