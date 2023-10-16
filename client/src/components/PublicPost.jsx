import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostComment from '../PostDetails/PostComment'; // Import the PostComment component
import CommentList from '../PostDetails/CommentList';
import LikeDislike from '../PostDetails/LikeDislike';

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
              <li key={posts._id}> {/* Use "_id" instead of "id" */}
                <h3>{posts.title}</h3>
                <p>{posts.content}</p>
                <img src="#" alt="image of post" /> <br />
                <a>Like </a>
                <a>Comment </a>
                <a> Add to Favorites  </a>
                {/* Add the PostComment component and pass comments */}
                <PostComment comments={posts.comments} />
                <CommentList comments={posts.comments}/>
                <LikeDislike/>
              </li>
            ))}
            <br />
          </ul>
        ) : (
          <p>There is no post created yet.</p>
        )}
      </div>
    </div>
  );
};

export default PublicPost;
