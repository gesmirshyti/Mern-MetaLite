import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PrivatePost = ({ userId }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/profile/posts/${userId}`, { withCredentials: true })
      .then((res) => {
        setUserPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div>
      <h2>Posts created by this user:</h2>
      <ul>
        {userPosts.map((post) => (
          <li key={post._id}>
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrivatePost;
