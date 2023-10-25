import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Button } from '@mui/material';
import { useNavigate, useParams, Link } from "react-router-dom";
import CreateComment from "./CreateComment";
import Footer from "../components/Footer";
const buttonStyle = {
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  background: '#2196F3',
  color: 'white',
  fontWeight: 'bold',
  marginRight: '10px',
  transition: 'background 0.3s',
};

const buttonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/post/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/profile/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUpdated(!updated);
        navigate('/profile/home');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
    <div className="details-body">
      {post ? (
        <div>
          <div style={buttonContainerStyle}>
            <Link to="/profile/home" style={buttonStyle}>
              Back at Home
            </Link>
            <Link to={`/profile/post/details/edit/${post._id}`} style={buttonStyle}>
              Update
            </Link>
          </div>
          <div className="nav-head d-flex ">
            <br />
            <br />
            <br />
            <Card className='post-card' sx={{ maxWidth: 600 }}>
              <CardMedia
                component="img"
                height="300"
                className='post-image'
                image={post.image}
                alt={"image" }
              />
            </Card>
            <CardContent>
              <CardHeader
                sx={{ width: "450px", marginTop: "-3%" }}
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <Button
                    className="delete-post"
                    onClick={(e) => handleDelete(post._id)}
                    startIcon={<DeleteIcon />}
                  ></Button>
                }
                title={post.title}
                subheader={'created at :' + post.createdAt}
              />
              <div className="details-content">
                <h3 className="details-h3">{post.postDescription}</h3>
                <a className="details-p">#{post.hashtag}</a>
              </div>
              <CreateComment postId={post._id} />
              <p className="comments">Total Comments: {post.comments.length}</p>
            </CardContent>
          </div>
          <div></div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
    <br /><br />
    <Footer></Footer>

    </div>
  );
};

export default PostDetails;
