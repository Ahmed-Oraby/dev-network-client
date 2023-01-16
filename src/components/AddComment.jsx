import React, { useState } from 'react';
import InputControl from './common/InputControl';
import sendIcon from '../assets/icons/send.svg';
import Loader from './common/Loader';
import { addComment } from '../services/postService';

export default function AddComment({ postId, onPostUpdate }) {
  const [comment, setComment] = useState('');
  //   const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddComment = async () => {
    if (!comment) return;

    setIsLoading(true);
    try {
      const newPost = await addComment(postId, comment);
      //   setError('');
      setComment('');
      setIsLoading(false);
      onPostUpdate(newPost);
    } catch (error) {
      //   setError(error.message);
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <>
      <div
        onKeyDown={handleKeyDown}
        className="my-4 flex items-center justify-between px-2"
      >
        <InputControl
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <img
          className="ml-2 mb-2 h-8 w-8 cursor-pointer"
          src={sendIcon}
          alt=""
          onClick={handleAddComment}
        />
      </div>

      {isLoading && (
        <div className="m-2 text-center">
          <Loader />
        </div>
      )}

      {/* {error && <Alert text={error} variant="danger" />} */}
    </>
  );
}
