import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const CreateComment = ({postId,comments}) => {
const [comment, setComment] = useState("");
const authorName = localStorage.getItem('name');

const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleComments = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/api/home/comments/create",{
        text: comment,
        post: postId,
        commentAuthor: authorName
      })
    .then((res) => {
      console.log("Comment Created", res.data);
      setComment(""); 
    })
    .catch((err) => {
      console.error("Error creating comment:", err);
    });
  };

  return (
    <div>
    <form  className='d-flex center' onSubmit={handleComments}>
      <h3>Add a comment:</h3>
      <TextField
      className='center'
        type="text"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Enter your comment"
      />
      <Button type="submit">Add Comment</Button>
    </form>
  </div>
  );
};

export default CreateComment;
