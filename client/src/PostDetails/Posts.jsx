import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import CreateComment from './CreateComment';
import CommentList from './CommentList';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogOut from '../authentication/Logout';

export default function Posts({ setStateLogged, stateLogged }) {
  const [post, setPost] = useState([]);
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/profile/posts', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updated]);

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
    <div className='d-flex'>
      <div>
        <ul className='sidebar'>
          <li className='sidebar-li'><Link to={'/profile/home'} style={{ my: 2, color: 'white', justifyContent: 'center', display: 'flex' }} className='Link' ><HomeIcon></HomeIcon> Home </Link></li>
          <li className='sidebar-li'><Link to={'/profile/dashboard'} style={{ my: 2, color: 'white', justifyContent: 'center', display: 'flex' }} className='Link'> <PersonIcon></PersonIcon> Profile</Link></li>
          <li className='sidebar-li'><Link to={'/profile/createPost'} style={{ my: 2, color: 'white', justifyContent: 'center', display: 'flex' }} className='Link'> <AddBoxIcon></AddBoxIcon>Create Post</Link></li>
          <li className='sidebar-li'><Link to={'/profile/createPost'} style={{ my: 2, color: 'white', justifyContent: 'center', display: 'flex' }} className='Link'><SaveAltIcon></SaveAltIcon> Messages</Link></li>
          <li className='sidebar-li'><Link style={{ my: 2, color: 'white', justifyContent: 'center', display: 'flex' }} className='Link'> <LogoutIcon></LogoutIcon>         <LogOut setStateLogged={setStateLogged} stateLogged={stateLogged} />
          </Link></li>
        </ul>
      </div>
      <div className='post-list'>

        {post.length > 0 ? (
          <ul className="post-ul"><br />
            <Typography variant="h4" component="div" gutterBottom>
              Dive into the newest Posts!
            </Typography>
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
                      <Button className="delete-post" onClick={(e) => handleDelete(posts._id)} startIcon={<DeleteIcon />}>

                      </Button>

                    }
                    title={posts.author}
                    subheader={'created at :' + posts.createdAt}
                  />
                  <CardMedia
                    component="img"
                    height="300"
                    className='post-image'
                    image={posts.image}
                    alt={"image"}
                  />
                  <CardContent>

                    <div className='content'><a href="#">#{posts.hashtag}</a></div>


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
                <CommentList postId={posts._id} comments={posts.comments} ></CommentList>
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