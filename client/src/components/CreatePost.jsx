import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function CreatePost() {
  const [post, setPost] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleCreatePost = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("User ID is missing.");
      return;
    }
    const postData = {
      title: post.title,
      content: post.content,
      author: userId, // id e autorit/userit
    };
    axios.post("http://localhost:8000/api/profile/createPost", postData)
      .then((response) => {
        console.log("Post created:", response.data);
        navigate('/profile/posts?userId=' + userId);
            })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div>
      <h1>Create a post Template</h1>
      <TextField
        label="Title"
        name="title"
        value={post.title}
        onChange={handlePostChange}
      />
      <TextField
        label="Content"
        name="content"
        value={post.content}
        onChange={handlePostChange}
      />
      <Button onClick={handleCreatePost}>Create Post</Button>
    </div>
  );
}
