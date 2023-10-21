import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const PostComment = ({ comments, postId,userId }) => {
const [comment, setComment] = useState({ comment: '' });

  // const [searchParams] = useSearchParams();
  // const userId = searchParams.get('userId');

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleComments = () => {
    const commentData = {
      text: comment.comment, 
      postedBy: userId, 
      post: postId,
    };

    axios.post("http://localhost:8000/api/home/comments/create/", commentData)
    .then((res) => {
      console.log("Comment Created", res.data);
      setComment({ comment: '' }); 
      // localStorage.getItem('postId', res.data.postId);
    })
    .catch((err) => {
      console.error("Error creating comment:", err);
    });
  };

  return (
    <div className=''>
      <label>Comments:</label>
      <TextField
        label="Comment"
        name="comment"
        value={comment.comment}
        onChange={handleCommentChange}
      />
                        <Button onClick={handleComments}>Add Comment</Button>

      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>

            {/* <p>{comment.comment}</p> */}
            <p>Posted by: {comment._id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComment;
