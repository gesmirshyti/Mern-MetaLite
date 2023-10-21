import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
} from "@mui/material";

const UpdatePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/post/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setValid(/^[A-Za-z\s]+$/.test(newTitle) && newTitle.length > 0);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
        setValid(/^[A-Za-z\s]+$/.test(newTitle) && newTitle.length > 0);
  };

  const handlePostDescriptionChange = (e) => {
    setPostDescription(e.target.value);
    setValid(/^[A-Za-z\s]+$/.test(newTitle) && newTitle.length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid) {
      axios
        .patch(`http://localhost:8000/api/post/details/edit/${id}`, {
          title,
          content,
          postDescription,
        })
        .then((res) => {
          console.log(res);
          navigate("/profile/home");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, margin: "20px auto" }}>
        <Typography variant="h5">Update Post</Typography>
        {post ? (
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              error={!valid}
              helperText={!valid ? "Title is required and must contain only letters." :""}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              id="content"
              label="Content"
              name="content"
              value={content}
              onChange={handleContentChange}
              error={!valid}
              helperText={!valid ? "Title is required and must contain only letters." :""}
           
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="postDescription"
              label="Description"
              name="postDescription"
              value={postDescription}
              onChange={handlePostDescriptionChange}
              error={!valid}
              helperText={!valid ? "Title is required and must contain only letters." :""}
           
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </form>
        ) : (
          <p>
            The post does not exist :) <Link to="/profile/home">Back</Link>
          </p>
        )}
      </Paper>
    </Container>
  );
};

export default UpdatePost;
