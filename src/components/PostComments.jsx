import React, { useState } from 'react';
// import InputControl from './common/InputControl';
// import sendIcon from '../assets/icons/send.svg';
// import Loader from './common/Loader';
// import {
//   addComment,
//   deleteComment,
//   editComment,
// } from '../services/postService';
import Comment from './Comment';
import AddComment from './AddComment';
// import { getTokenData } from '../services/authService';

export default function PostComments({ postId, comments, onPostUpdate }) {
  // const [comment, setComment] = useState('');
  // const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  // const handleAddComment = async () => {
  //   if (!comment) return;

  //   setIsLoading(true);
  //   try {
  //     const newPost = await addComment(postId, comment);
  //     setError('');
  //     setComment('');
  //     setIsLoading(false);
  //     onPostUpdate(newPost);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     handleAddComment();
  //   }
  // };

  // const handleCommentDelete = async (commentId) => {
  //   try {
  //     const newPost = await deleteComment(postId, commentId);
  //     onPostUpdate(newPost);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleCommentEdit = async (commentId, text) => {
  //   try {
  //     const newPost = await editComment(postId, commentId, text);
  //     onPostUpdate(newPost);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const token = getTokenData();

  return (
    <>
      <AddComment postId={postId} onPostUpdate={onPostUpdate} />
      {/* <div onKeyDown={handleKeyDown} className="my-4 flex items-center justify-between px-2">
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
      </div> */}

      {/* {isLoading && (
        <div className="m-2 text-center">
          <Loader />
        </div>
      )} */}

      <div className="max-h-60 overflow-x-hidden overflow-y-scroll">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            postId={postId}
            onPostUpdate={onPostUpdate}
            // onCommentDelete={handleCommentDelete}
            // onCommentEdit={handleCommentEdit}
          />
        ))}
      </div>
    </>
  );
}
