import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/postService';
import Alert from './common/Alert';
import Button from './common/Button';
import Loader from './common/Loader';

export default function NewPost() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setText(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPost();
  };

  async function submitPost() {
    setIsLoading(true);

    try {
      await createPost(text);
      //TODO: error handling
      //   setError('');
      // window.location.replace('/dashboard');
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'An error occured, please try again.');
    }
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col items-center justify-center"
    >
      <textarea
        className="w-4/5 resize-none rounded-md border-2 border-gray-400 p-3 text-base text-gray-700 outline-none placeholder:text-gray-500 focus:border-blue-500 sm:w-3/5 md:w-1/2"
        name="post"
        id="post"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your post..."
        cols="30"
        rows="10"
      ></textarea>

      {isLoading && (
        <div className="mt-4">
          <Loader />
        </div>
      )}

      {error && <Alert text={error} variant="danger" />}

      <Button
        type="submit"
        text="Create Post"
        variant="secondary"
        disabled={isLoading}
      />
    </form>
  );
}
