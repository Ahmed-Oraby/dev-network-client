import React from 'react';

export default function Footer() {
  return (
    <footer className="flex h-16 w-full items-center justify-center bg-gray-800 px-10 py-5 text-center text-lg">
      <p className="text-gray-100">
        Made with 💖 by{' '}
        <a
          className="text-indigo-300"
          href="https://github.com/Ahmed-Oraby"
          target="_blank"
        >
          Ahmed&nbsp;Oraby
        </a>
      </p>
    </footer>
  );
}
