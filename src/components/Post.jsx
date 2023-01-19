import React, { useEffect, useState } from 'react';
import commentIcon from '../assets/icons/comment.svg';
import editIcon from '../assets/icons/edit.svg';
import deleteIcon from '../assets/icons/delete.svg';
import LikePost from './LikePost';
import PostComments from './PostComments';
import { getTokenData } from '../services/authService';
import { deletePost, editPost } from '../services/postService';
import formatDate from '../utils/formatDate';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { Link } from 'react-router-dom';

export default function Post({ post, onPostUpdate, onPostDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { _id: postId, user, text, date, likes, comments, isEdited } = post;
  const token = getTokenData();

  const handlePostDelete = async () => {
    try {
      await deletePost(postId);
      setShowDelete(false);
      onPostDelete(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostEdit = async (newText) => {
    try {
      const newPost = await editPost(postId, newText);
      setShowEdit(false);
      onPostUpdate(newPost);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-5 w-full rounded-lg border border-gray-400 bg-white py-6 px-4 sm:w-4/5 md:w-3/4 md:px-8 lg:w-3/5 xl:w-1/2">
      <div className="flex items-center justify-between">
        <Link to={`/profile/${user._id}`} className="flex items-center">
          <img
            className="mr-2 h-10 w-10 rounded-full"
            src={user.avatar}
            alt=""
          />
          <p className="text-lg font-bold text-gray-700">{user.name}</p>
        </Link>

        {token.user.id === user._id && (
          <div className="flex w-16 items-center justify-between">
            <img
              onClick={() => setShowEdit(true)}
              className="h-6 w-6 cursor-pointer"
              src={editIcon}
              alt=""
            />
            <img
              onClick={() => setShowDelete(true)}
              className="h-6 w-6 cursor-pointer"
              src={deleteIcon}
              alt=""
            />
          </div>
        )}
      </div>

      {isEdited && <p className="mt-1 ml-1 text-gray-500">Edited</p>}
      <p className="mt-2 ml-1 p-2 text-xl font-medium text-gray-900">{text}</p>
      <p className="ml-2 mt-2 border-b border-gray-200 py-2 text-right text-base text-gray-600">
        {formatDate(date)}
      </p>

      <div className="flex items-center justify-around">
        <LikePost postId={postId} likes={likes} onPostUpdate={onPostUpdate} />

        <div
          onClick={() => setShowComments(!showComments)}
          className="ml-2 mt-2 flex items-center"
        >
          <img className="h-6 w-6 cursor-pointer" src={commentIcon} alt="" />
          <span className="pl-2 pt-1 text-lg text-gray-500">
            {comments.length}
          </span>
        </div>
      </div>

      {showComments && (
        <PostComments
          postId={postId}
          comments={comments}
          onPostUpdate={onPostUpdate}
        />
      )}

      {showEdit && (
        <EditModal
          text={text}
          onSaveEdit={handlePostEdit}
          onCloseEdit={() => setShowEdit(false)}
        />
      )}

      {showDelete && (
        <DeleteModal
          onPostDelete={handlePostDelete}
          onCloseDelete={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
