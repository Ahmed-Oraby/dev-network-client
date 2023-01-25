import React, { useState } from 'react';
import { getTokenData } from '../services/authService';
import { deleteComment, editComment } from '../services/postService';
import formatDate from '../utils/formatDate';
import editIcon from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/delete.svg';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { Link } from 'react-router-dom';
import formatName from '../utils/formatName';

export default function Comment({ comment, postId, onPostUpdate }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const token = getTokenData();

  const handleCommentDelete = async () => {
    try {
      const newPost = await deleteComment(postId, comment._id);
      setShowDelete(false);
      onPostUpdate(newPost);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentEdit = async (text) => {
    try {
      const newPost = await editComment(postId, comment._id, text);
      setShowEdit(false);
      onPostUpdate(newPost);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4 rounded-lg border border-gray-300 p-2">
      <div className="flex items-start">
        <Link
          to={`/profile/${comment.user._id}`}
          className="mb-1 mr-1 flex flex-col items-center justify-center text-center sm:mr-3"
        >
          <img
            className="h-8 w-8 rounded-full"
            src={comment.user.avatar}
            alt=""
          />
          <p className="text-sm font-bold text-gray-700">
            {formatName(comment.user.name)}
          </p>
        </Link>
        <p className="ml-2 flex-grow text-base text-blue-900 sm:ml-4">
          {comment.text}
        </p>
        {token.user.id === comment.user._id && (
          <div className="flex h-14 flex-col items-center justify-between">
            <img
              onClick={() => setShowEdit(true)}
              className="h-5 w-5 cursor-pointer"
              src={editIcon}
              alt=""
            />
            <img
              onClick={() => setShowDelete(true)}
              className="h-5 w-5 cursor-pointer"
              src={deleteIcon}
              alt=""
            />
          </div>
        )}
      </div>
      <p className="m-1 pt-1 text-right text-sm text-gray-500">
        {formatDate(comment.date)}
      </p>

      {showEdit && (
        <EditModal
          text={comment.text}
          onSaveEdit={handleCommentEdit}
          onCloseEdit={() => setShowEdit(false)}
        />
      )}

      {showDelete && (
        <DeleteModal
          onPostDelete={handleCommentDelete}
          onCloseDelete={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
