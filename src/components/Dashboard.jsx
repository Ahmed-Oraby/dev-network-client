import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { getTokenData, logout } from '../services/authService';
import { getPosts } from '../services/postService';
import Alert from './common/Alert';
import Button from './common/Button';
import Post from './Post';
import PostSkeleton from './common/PostSkeleton';

export default function Dashboard() {
  const [posts, setPosts] = useState(Array(10).fill(null));
  const [isEmpty, setIsEmpty] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const { exp } = getTokenData();
    const expDate = new Date(exp * 1000).getTime();
    const dateNow = new Date().getTime();
    if (expDate <= dateNow) {
      logout();
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [pageNum]);

  // let pageNum = 1;

  const fetchPosts = async () => {
    const pageSize = 5;
    const newPosts = await getPosts(pageSize, pageNum);
    console.log(newPosts);

    if (newPosts.length === 0) {
      setIsEmpty(true);
      if (posts[0] === null) setPosts([]);
      return;
    }
    const allPosts =
      posts[0] === null ? [...newPosts] : [...posts, ...newPosts];
    setPosts(allPosts);
    setIsEmpty(false);
  };

  const handlePostUpdate = (newPost) => {
    const newPosts = [...posts];
    const postIndex = newPosts.findIndex((item) => item._id === newPost._id);
    // newPosts.splice(postIndex, 1, newPost);
    newPosts[postIndex] = newPost;
    setPosts(newPosts);
  };

  const handlePostDelete = (postId) => {
    const newPosts = [...posts];
    const postIndex = newPosts.findIndex((item) => item._id === postId);
    newPosts.splice(postIndex, 1);
    setPosts(newPosts);
  };

  const handleLoadMore = async () => {
    if (posts.length === 0) {
      // pageNum = 1;
      setPageNum(1);
    } else {
      // pageNum += 1;
      setPageNum(pageNum + 1);
    }
    console.log(pageNum);
    // fetchPosts();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between p-5">
        <h2 className="mt-4 text-center text-4xl text-gray-700">
          Latest Posts
        </h2>
        <Button
          as="link"
          text="Create New Post"
          variant="secondary"
          to="/newpost"
        />
      </div>

      <div className="mt-5 flex min-w-fit flex-col items-center justify-center bg-gray-50 p-5">
        {posts.length !== 0 &&
          posts.map((post, index) =>
            post ? (
              <Post
                key={post._id}
                post={post}
                onPostUpdate={handlePostUpdate}
                onPostDelete={handlePostDelete}
              />
            ) : (
              <PostSkeleton key={index} />
            )
          )}
      </div>

      <div className="mb-10 flex flex-col items-center justify-between p-5">
        {isEmpty && posts[0] && (
          <Alert text="There are no more posts." variant="primary" />
        )}
        {!isEmpty && (
          <Button
            type="button"
            text="Load More"
            variant="secondary"
            onClick={handleLoadMore}
          />
        )}
      </div>
    </>
  );
}
