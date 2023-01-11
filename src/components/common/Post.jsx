import React, { useState } from 'react';
import { getTokenData } from '../../services/authService';
import like from '../../assets/icons/like.svg';
import likeFilled from '../../assets/icons/like-fill.svg';

export default function Post({ name, avatar, text, date, likeCount }) {
  const [liked, setLiked] = useState(false);

  const postDate = new Date(date).toLocaleDateString();
  console.log(postDate);

  return (
    <div className="mb-10 w-full min-w-max rounded-lg border border-gray-400 bg-white py-6 px-8 sm:w-4/5 md:w-3/5">
      <div className="flex items-center justify-start">
        <img className="mr-2 h-10 w-10 rounded-full" src={avatar} alt="" />
        <p className="text-lg font-bold text-gray-700">{name}</p>
      </div>
      <p className="mt-2 ml-2 text-xl font-medium text-gray-900">{text}</p>
      <p className="ml-2 mt-2 border-b border-gray-200 py-2 text-base text-gray-500">
        {postDate}
      </p>
      <div className="ml-2 mt-2 flex items-center">
        {liked ? (
          <img
            className="h-6 w-6 cursor-pointer"
            src={like}
            alt=""
            onClick={() => setLiked((l) => !l)}
          />
        ) : (
          <img
            className="h-6 w-6 cursor-pointer"
            src={likeFilled}
            alt=""
            onClick={() => setLiked((l) => !l)}
          />
        )}
        <span className="pl-2 pt-1 text-lg text-gray-500">{likeCount}</span>
      </div>
    </div>
  );
}
