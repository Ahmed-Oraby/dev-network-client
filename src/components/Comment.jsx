import React from 'react';
import formatDate from '../utils/formatDate';

export default function Comment({ comment }) {
  // const commentDate = new Date(comment.date).toLocaleDateString();

  return (
    <div className="m-4 rounded-lg border border-gray-300 p-2">
      <div className="flex items-start">
        <div className="mr-3 mb-1 flex flex-col items-center">
          <img
            className="h-8 w-8 rounded-full"
            src={comment.user.avatar}
            alt=""
          />
          <p className="text-sm font-bold text-gray-700">{comment.user.name}</p>
        </div>
        <p className="m-2 text-base text-blue-900 sm:ml-4">{comment.text}</p>
      </div>
      <p className="m-1 text-right text-sm text-gray-500">
        {formatDate(comment.date)}
      </p>
    </div>
  );
}
