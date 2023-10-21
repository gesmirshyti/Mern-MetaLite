import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostComment from './PostComment';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import PersonIcon from '@mui/icons-material/Person';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import CreateComment from './CreateComment';
import CommentList from './CommentList';


export default function RecipeReviewCard() {
    const [post, setPost] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        axios
          .get('http://localhost:8000/api/profile/posts', { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            setPost(res.data);
            // setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            // setLoading(false);
          });
      }, [updated]);
    
      const handleDelete = (id) => {
        axios
          .delete(`http://localhost:8000/api/profile/${id}`, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            setUpdated(!updated);
          })
          .catch((err) => {
            console.log(err);
          });
        }
        
        const handleLike = (postId) => {
          // Send a request to like the post
          axios
            .post(`http://localhost:8000/api/posts/like/${postId}`, null, { withCredentials: true })
            .then((res) => {
              setUpdated(!updated);
            })
            .catch((err) => {
              console.log(err);
            });
      }
  
      const handleUnlike = (postId) => {
          // Send a request to unlike the post
          axios
            .post(`http://localhost:8000/api/posts/dislike/${postId}`, null, { withCredentials: true })
            .then((res) => {
              setUpdated(!updated);
            })
            .catch((err) => {
              console.log(err);
            });
      }


  return (
    <div className='d-flex'>
        {/* <div> 
            <ul className='sidebar'>
            <li className='sidebar-li'><Link style={{ my: 2, color: 'white' ,justifyContent:'center',display:'flex' }} className='Link' ><HomeIcon></HomeIcon> Home  </Link></li>
            <li className='sidebar-li'><Link style={{ my: 2, color: 'white',justifyContent:'center',display:'flex'  }} className='Link'> <PersonIcon></PersonIcon> Profile</Link></li>
            <li className='sidebar-li'><Link style={{ my: 2, color: 'white',justifyContent:'center',display:'flex'  }} className='Link'> <TurnedInNotIcon></TurnedInNotIcon> Saved Posts</Link></li>
            <li className='sidebar-li'><Link style={{ my: 2, color: 'white',justifyContent:'center',display:'flex'  }} className='Link'><SaveAltIcon></SaveAltIcon> Messages</Link></li>
            <li className='sidebar-li'><Link style={{ my: 2, color: 'white',justifyContent:'center',display:'flex'  }} className='Link'> <LogoutIcon></LogoutIcon> Logout</Link></li>
            </ul>
        </div> */}
    <div className='post-list'>
    {post.length > 0 ? (
      <ul className="post-ul">
        
        {post.map((posts) => (
          <li className="post-li" key={posts._id}>
            <Link to={`/profile/post/detail/${posts._id}`}>Details</Link>
            <Card className='post-card' sx={{ maxWidth: 600 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    A
                  </Avatar>
                }
                action={
                 <Button className="delete-post" onClick={(e) => handleDelete(posts._id)}  startIcon={<DeleteIcon />}>

</Button>

                  
                }
                title={posts.author}
                subheader={'created at :'+posts.createdAt}
              />
              <CardMedia
                component="img"
                height="300"
                className='post-image'
                image={posts.image}
                alt={"image" }
              />
                        {/* <Button onClick={navigate(`/profile/post/detail/${posts._id}`)}>Details</Button> */}

              <CardContent>
              {posts.content.split(' ').length > 100  ? (
        <div>
          <div >{posts.content.split(' ').slice(0, 100).join(' ')}...<Link to={"/profile/dashboard"}>See More</Link></div>
          
        </div>
      ) : (
        <div>{posts.content}
        </div>
        
      )}

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
            <CreateComment postId={posts._id} comments={posts.comments} ></CreateComment>
<CommentList postId={posts._id}  comments={posts.comments} ></CommentList>
          </li>
          
        ))}
        <br />

      </ul>
    ) : (
      <p>There is no post created yet.</p>
    )}
  </div>
  </div>
  );
}