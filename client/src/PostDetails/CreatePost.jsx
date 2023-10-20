import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [post, setPost] = useState({ title: "", content: "", image: "",author :"",postDescription:"" });
  const navigate = useNavigate();

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleCreatePost = () => {
    const postData = {
      title: post.title,
      content: post.content,
      image: post.image,
      postDescription:post.postDescription
    };

    axios
      .post("http://localhost:8000/api/profile/createPost", postData)
      .then((response) => {
        console.log("Post created:", response.data);
        localStorage.setItem('postId',response.data.postId);
        navigate("/profile/home");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });


      // axios
      // .get("http://localhost:8000/api/users"),{},{withCredentials: true}
      // .then((res) => {
      //   console.log("This is response of user",res)
      // }) 
      // .catch((err) => {
      //   console.log(err);
      // });
  };

  return (
    <div>
      <h1>Create a Post Template</h1>
      <p>Your Name :</p>
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
      <TextField
        label="Description"
        name="postDescription"
        value={post.postDescription}
        onChange={handlePostChange}
      />
      <TextField
        label="Image URL"
        name="image"
        value={post.image}
        onChange={handlePostChange}
      />

      <Button onClick={handleCreatePost}>Create Post</Button>
    </div>
  );
}
