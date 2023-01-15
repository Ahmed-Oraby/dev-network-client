import React, { useState, useEffect } from 'react';
import like from '../assets/icons/like.svg';
import likeFilled from '../assets/icons/like-fill.svg';
import { likePost, unLikePost } from '../services/postService';
import { getTokenData } from '../services/authService';

export default function LikePost({ postId, likes, onPostUpdate }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const { user } = getTokenData();
    const likedUser = likes.find((item) => item.user._id === user.id);
    if (likedUser) {
      setLiked(true);
    }
  }, []);

  const handlePostLike = async () => {
    setLiked(true);
    try {
      const newPost = await likePost(postId);
      onPostUpdate(newPost);
    } catch (error) {
      setLiked(false);
    }
  };

  const handlePostUnLike = async () => {
    setLiked(false);
    try {
      const newPost = await unLikePost(postId);
      onPostUpdate(newPost);
    } catch (error) {
      setLiked(true);
    }
  };

  return (
    <div className="ml-2 mt-2 flex items-center">
      {liked ? (
        <img
          className="h-6 w-6 cursor-pointer"
          src={likeFilled}
          alt=""
          onClick={handlePostUnLike}
        />
      ) : (
        <img
          className="h-6 w-6 cursor-pointer"
          src={like}
          alt=""
          onClick={handlePostLike}
        />
      )}
      <span className="pl-2 pt-1 text-lg text-gray-500">{likes.length}</span>
    </div>
  );
}
