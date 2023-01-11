import React, { useEffect, useState } from 'react';
import { getTokenData } from '../services/authService';
import { getPosts } from '../services/postService';
import Post from './common/Post';
import PostSkeleton from './common/PostSkeleton';

export default function Dashboard() {
  // const [pageSize, setPageSize] = useState(10);
  const [posts, setPosts] = useState(Array(10).fill(null));
  const [pageNum, setPageNum] = useState(1);
  console.log(posts);
  useEffect(() => {
    fetchPosts();
  }, [pageNum]);

  // const tokenData = getTokenData();
  const pageSize = 5;

  const fetchPosts = async () => {
    const newPosts = await getPosts(pageSize, pageNum);
    setPosts(newPosts);
    console.log(newPosts);
  };

  const handleLoadMore = async () => {
    setPageNum(pageNum + 1);
    // console.log(posts);
  };

  return (
    <>
      <h2 className="mt-6 text-center text-4xl text-gray-700">Latest Posts</h2>
      <div className="mt-5 flex flex-col items-center justify-center bg-gray-50 p-10 ">
        {posts.map((item) =>
          item ? (
            <Post
              key={item._id}
              name={item.user.name}
              avatar={item.user.avatar}
              text={item.text}
              date={item.date}
              likeCount={item.likes.length}
            />
          ) : (
            <PostSkeleton />
          )
        )}

        {/* <button onClick={handleLoadMore}>Load more</button> */}
      </div>
    </>
  );
}
