import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  type,
  text,
  variant = 'primary',
  as = 'button',
  to,
  onClick,
}) {
  const btnClasses = {
    primary:
      'mt-4 w-full bg-slate-900 py-3 px-6 text-base font-medium uppercase tracking-wider text-white hover:bg-slate-700',
    secondary:
      'mt-4 rounded-full border-2 border-gray-600 bg-gray-200 px-6 py-2 text-base font-medium uppercase tracking-wider text-gray-700 hover:bg-gray-300',
  };

  const btn = (
    <button className={btnClasses[variant]} type={type} onClick={onClick}>
      {text}
    </button>
  );

  const link = (
    <Link className={btnClasses[variant]} to={to}>
      {text}
    </Link>
  );

  return as === 'button' ? btn : link;
}
