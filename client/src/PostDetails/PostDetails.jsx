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
const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/post/${id}`)
      .then((res) => {
        setPost(res.data);
        

      })
      .catch((err) => console.log(err));
  }, []);
 
  // const handleChange = (newVaule) => {
  //   console.log(post)
  //   console.log(newVaule)
  //   axios.patch(`http://localhost:8000/api/post/details/${id}`, {
  //     ...post,
  //     ...newVaule
  //   })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => console.log(err))

  // }
  return (
    <div className="details-body">
      {post ? (
        <div>
          <div className="nav-head"> <br /> <br /> <br />
          <Link to={"/profile/home"} className="text-none" >Back at Home</Link>
            <Card className='post-card' sx={{ maxWidth: 600 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                 <Button className="delete-post" onClick={(e) => handleDelete(posts._id)}  startIcon={<DeleteIcon />}></Button>

                  
                }
                title={post.title}
                subheader={'created at :'+post.createdAt}
              />
              <CardMedia
                component="img"
                height="300"
                className='post-image'
                image={post.image}
                alt={"image" }
              />
                        {/* <Button onClick={navigate(`/profile/post/detail/${posts._id}`)}>Details</Button> */}

              <CardContent>
 

              </CardContent>
              <BottomNavigation
  showLabels
  className='post-bottom'
  style={{ height: '100px' }}

>
<BottomNavigationAction label="Liked" icon={<FavoriteIcon />} />
  <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
  <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
</BottomNavigation>

            </Card>

          </div>
<div>

<PostComment comments={post.comments} ></PostComment>

</div>
         
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

}

export default PostDetails;