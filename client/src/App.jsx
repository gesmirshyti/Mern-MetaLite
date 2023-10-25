import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import React, { useEffect, useState } from 'react';
import LogOut from './authentication/Logout';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CreatePost from './PostDetails/CreatePost';
import SignIn from './authentication/Signin';
import SignUp from './authentication/SignUp';
import PostDetails from './PostDetails/PostDetails';
import Posts from './PostDetails/Posts';
import UpdatePost from './PostDetails/UpdatePost';
import ContactForm from './components/ContactForm';
import About from './components/About';
import Profile from './ProfileDetails/Profile';
import UpdateUser from './ProfileDetails/UpdateUser';
function App() {
  const loggedIn = localStorage.getItem('isLoggedIn');
  const [stateLogged, setStateLogged] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    console.log("App test");
  }, [stateLogged]);

  return (
    <BrowserRouter>


      <div>
        <Navbar /> <br /><br /><br />
        <LogOut setStateLogged={setStateLogged} stateLogged={stateLogged} />
        {loggedIn ? (
          <Routes>
            <Route element={<Posts />} path="/register" default />
            <Route path="/" default element={<Home />} />
            <Route path="/home" default element={<Posts />} />
            <Route path="/profile/dashboard" default element={<Profile setStateLogged={setStateLogged} stateLogged={stateLogged} />} />
            <Route path="/profile/createPost" default element={<CreatePost />} />
            <Route path="/profile/home" default element={<Posts />} />
            <Route path="/profile/post/detail/:id" default element={<PostDetails />} />
            <Route path="/profile/post/details/edit/:id" default element={<UpdatePost />} />
            <Route path="/contact" default element={<ContactForm />} />
            <Route path="/about" default element={<About />} />
            <Route path="/profile/dashboard/update/:id" default element={<UpdateUser />} />
            <Route path="/signin" default element={<Posts />} />
          </Routes>
        ) : (
          <Routes>
            <Route element={<SignUp setStateLogged={setStateLogged} />} path="/register" default />
            <Route path="/profile/dashboard" default element={<Home />} />
            <Route path="/profile/createPost" default element={<Home />} />
            <Route path="/profile/post/detail/:id" default element={<Home />} />
            <Route path="/profile/post/details/edit/:id" default element={<Home />} />
            <Route path="/profile/dashboard/update/:id" default element={<Home />} />

            <Route path="/profile/home" default element={<SignUp />} />
            <Route path="/signin" default element={<SignIn setStateLogged={setStateLogged} stateLogged={stateLogged} onLogin={(userId) => setUserId(userId)} />} />
            <Route path="/contact" default element={<ContactForm />} />
            <Route path="/about" default element={<About />} />
            <Route path="/" default element={<Home />} />

          </Routes>
        )}


      </div>
    </BrowserRouter>
  );
}

export default App;
