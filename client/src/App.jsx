import './App.css';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'; // Remove useSearchParams
import React, { useEffect, useState } from 'react';
// import Register from './components/Register';
import LogOut from './authentication/Logout';
// import Login from './components/Login';
import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Profile from './ProfileDetails/Profile';
import CreatePost from './PostDetails/CreatePost';
import PublicPost from './PostDetails/PublicPost';
import PrivatePost from './ProfileDetails/PrivatePost';
import SignIn from './authentication/Signin';
import SignUp from './authentication/SignUp';
import PostDetails from './PostDetails/PostDetails';
import RecipeReviewCard from './PostDetails/Card';
import { Card } from '@mui/material';
import UpdatePost from './PostDetails/UpdatePost';
// import ProfileImages from './ProfileDetails/ProfileImages';

function App() {
  const loggedIn = localStorage.getItem('isLoggedIn');
  const [stateLogged, setStateLogged] = useState(false);
  const [userId, setUserId] = useState(null); // Add a state variable for userId


  useEffect(() => {
    console.log("App test");
  }, [stateLogged]);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <LogOut setStateLogged={setStateLogged} stateLogged={stateLogged} />
        {loggedIn ? (
          <Routes>
            <Route element={<SignUp setStateLogged={setStateLogged} stateLogged={stateLogged} />} path="/register" default />
            {/* <Route element={<LogOut setStateLogged={setStateLogged} stateLogged={stateLogged} />} path="/register" default /> */}

            {/* <Route element={<Login setStateLogged={setStateLogged} setStateLogged={setStateLogged} onLogin={(userId) => setUserId(userId)} />} path="/login" default /> */}
            <Route path="/" default element={<Home />} />
            {/* <Route path="/profile/dashboard" default element={<Profile />} /> */}
            <Route path="/profile/createPost" default element={<CreatePost />} />
            <Route path="/profile/home" default element={<RecipeReviewCard />} />
            <Route path="/profile/post/detail/:id" default element={<PostDetails />} />
            <Route path="/profile/post/details/edit/:id" default element={<UpdatePost />} />

            <Route path="/signin" default element={<SignIn/>} />
            {/* <Route path="/profile/user/update" default element={<UpdateUser/>} /> */}
            {/* <Route path="/profile/posts" default element={<PrivatePost userId={userId} />} /> */}

            <Route default element={<LogOut />} />

          </Routes>
        ) : (
          <Routes>
            <Route element={<SignUp setStateLogged={setStateLogged} />} path="/register" default />
            {/* <Route element={<Login setStateLoged={setStateLoged} stateLoged={stateLoged} />} path="/login" default /> */}
            <Route path="/" default element={<SignUp />} />
            <Route path="/profile/dashboard" default element={<SignUp />} />
            <Route path="/profile/createPost" default element={<SignUp setStateLogged={setStateLogged} />} />
            <Route path="/profile/home" default element={<SignUp />} />
            <Route path="/signin" default element={<SignIn setStateLogged={setStateLogged} stateLogged={stateLogged} onLogin={(userId) => setUserId(userId)}/>} />
          </Routes>
        )}
        {/* <Footer /> */}
        
      </div>
      {/* <RecipeReviewCard></RecipeReviewCard> */}
    </BrowserRouter>
  );
}

export default App;
