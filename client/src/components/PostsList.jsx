import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';

export default function PostsList() {
  const [postsData, setPostsData] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://127.0.0.4:7004/api/posts`);
        console.log(res.data);
        setPostsData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const postsElements = Object.values(postsData).map((post) => (
    <div className="" key={post.postId}>
      <h3>{post.post}</h3>
      {post.comments.map((comment) => (
        <span key={comment.id}>{comment.comment}</span>
      ))}
      <CreateComment postId={post.postId} />
    </div>
  ));


  return (
    <div>
      <h1>Posts:</h1>
      {postsElements}
    </div>
  );
}
