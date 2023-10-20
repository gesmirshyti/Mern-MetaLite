import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostComment from './PostComment'; 
import CommentList from './CommentList';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


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
      .delete(`http://localhost:8000/api/profile/${id}`, { withCredentials: true })
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
      <Link to={"/profile/createPost"}>Create a post </Link>
      <Link to={"/profile/dashboard"}>profile </Link>
      <Link to={"/profile/update"}>Update</Link>
      <div className="post-list">
        {post.length > 0 ? (
          <ul className='post-ul'>
            {post.map((posts) => (
              <li className='post-li' key={posts._id}> 
              <div>
              <div className='post-content d-flex'>
                <h3 className='post-item'>{posts.title}</h3>
                 <Button className="delete-post" onClick={(e) => handleDelete(posts._id)}  startIcon={<DeleteIcon />}></Button>
</div>
                <img className='post-image' src={posts.image}></img>

                 <p className='post-item'>{posts.content}</p>
                 <Link className="text-none" to={`/profile/post/detail/${post._id}`}><p>View Post</p></Link>

                
                <PostComment postComments={posts.comments} postId={posts._id} />
                </div>
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
{/* <CommentList comments={posts.comments} /> */}
