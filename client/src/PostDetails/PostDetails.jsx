import React, { useState, useEffect } from "react";
import axios from "axios";
import RestoreIcon from '@mui/icons-material/Restore';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Button } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate, useParams, Link } from "react-router-dom";
import PostComment from "./PostComment";
import CommentList from "./CommentList";
import CreateComment from "./CreateComment";
const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate()


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
        navigate('/profile/home')
      })
      .catch((err) => {
        console.log(err);
      });
    }
  return (
    <div className="details-body">
      {post ? (
        <div>
          <div className="nav-head d-flex "> <br /> <br /> <br />
          <Link to={"/profile/home"} className="text-none" >Back at Home</Link>
           <Link to={`/profile/post/details/edit/${post._id}`}>Update</Link>
           <Card className='post-card' sx={{ maxWidth: 600 }}>
              <CardMedia
                component="img"
                height="300"
                className='post-image'
                image={post.image}
                alt={"image" }
              />
                        {/* <Button onClick={navigate(`/profile/post/detail/${posts._id}`)}>Details</Button> */}



            </Card>
            <CardContent >
            <CardHeader sx={{ width:"450px", marginTop:"-3%" }}
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                 <Button className="delete-post" onClick={(e) => handleDelete(post._id)}  startIcon={<DeleteIcon />}></Button>

                  
                }
                
                title={post.title}
                subheader={'created at :'+post.createdAt}
              />
                            <div className="details-content">
 <h3 className="details-h3" >{post.content}</h3>
<a className="details-p">#{post.postDescription}</a>

</div>
<CreateComment postId={post._id} ></CreateComment>
<CommentList postId={post._id}></CommentList>

<p className="comments">Total Comments: {post.comments.length}</p>


 </CardContent>
 <CommentList postId={post._id}></CommentList>
          </div>
<div>


</div>
         
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );

}

export default PostDetails;