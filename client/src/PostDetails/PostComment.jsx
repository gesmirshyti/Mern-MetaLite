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
      text: comment.comment, // Use 'text' instead of 'comment'
      author: userId, // Pass the 'author' (user) ID
      post: postId, // Pass the 'post' (post) ID
    };

    axios.post("http://localhost:8000/api/home/comments/create", commentData)
    .then((res) => {
      console.log("Comment Created", res.data);
      setComment({ comment: '' }); // Reset the input field
    })
    .catch((err) => {
      console.error("Error creating comment:", err);
    });
  };

  return (
    <div>
      <Button>Comments:</Button>
      <TextField
        label="Comment"
        name="comment"
        value={comment.comment}
        onChange={handleCommentChange}
      />
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <p>Posted by: {comment.author}</p>
          </li>
        ))}
      </ul>
      <Button onClick={handleComments}>Add Comment</Button>
    </div>
  );
};

export default PostComment;
