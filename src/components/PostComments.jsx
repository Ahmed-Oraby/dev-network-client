import React, { useState } from 'react';
import InputControl from './common/InputControl';
import sendIcon from '../assets/icons/send.svg';
import Loader from './common/Loader';
import { addComment } from '../services/postService';
import Comment from './Comment';
import Alert from './common/Alert';
import { getTokenData } from '../services/authService';

export default function PostComments({ postId, comments, onPostUpdate }) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddComment = async () => {
    if (!comment) return;

    setIsLoading(true);
    try {
      const newPost = await addComment(postId, comment);
      setError('');
      setComment('');
      setIsLoading(false);
      onPostUpdate(newPost);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  const token = getTokenData();

  return (
    <div onKeyDown={handleKeyDown}>
      <div className="my-4 flex items-center justify-between px-3">
        <div className="mr-3 mb-1 flex flex-col items-center">
          <img
            className="h-8 w-8 rounded-full"
            src={token.user.avatar}
            alt=""
          />
          <p className="text-sm font-bold text-gray-700">{token.user.name}</p>
        </div>
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

      <div className="max-h-60 overflow-x-hidden overflow-y-scroll">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>

      {error && <Alert text={error} variant="danger" />}
    </div>
  );
}
