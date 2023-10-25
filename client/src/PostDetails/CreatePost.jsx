import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Footer from "../components/Footer";
const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    hashtag: "",
    image: "",
    postDescription: "",
    author:""
  });

  const navigate = useNavigate();
  const authorName = localStorage.getItem('name');

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value,  author: authorName });
  };

  const handleCreatePost = () => {
    const postData = {
      title: post.title,
      hashtag: post.hashtag,
      image: post.image,
      postDescription: post.postDescription,
      author: authorName,
    };

    axios
      .post("http://localhost:8000/api/profile/createPost", postData)
      .then((response) => {
        console.log("Post created:", response.data);
        localStorage.setItem("postId", response.data.postId);
        navigate("/profile/home");
        
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div>
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, margin: "20px auto" }}>
        <Typography variant="h5">Create a Post</Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="title"
            label="Title"
            name="title"
            value={post.title}
            onChange={handlePostChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="hashtag"
            label="Hashtag"
            name="hashtag"
            value={post.hashtag}
            InputProps={{
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            }}
            onChange={handlePostChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            id="postDescription"
            label="Description"
            name="postDescription"
            value={post.postDescription}
            onChange={handlePostChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="image"
            label="Image URL"
            name="image"
            value={post.image}
            onChange={handlePostChange}
          />
          
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCreatePost}
          >
            Create Post
          </Button>
        </form>
      </Paper>
    </Container>
          <Footer />
</div>
  );
};

export default CreatePost;
