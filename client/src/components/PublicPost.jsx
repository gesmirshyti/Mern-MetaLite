import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PublicPost = (props) => {
  const [post, setPost] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get('http://localhost:8000/api/profile/posts', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [updated]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/profile/posts/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUpdated(!updated);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
        <h2>This is the list of the Posts:</h2>
        <div className="col-list">

{post.length > 0 ? (
        <ul>
          {post.map((posts) => (
            <li key={posts.id}>
              <h3>{posts.title}</h3>
              <p>{posts.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is no post created yet.</p>
      )}

</div>
    </div>
  );
};

export default PublicPost;
