import './App.css';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'; // Remove useSearchParams
import React, { useEffect, useState } from 'react';
import Register from './components/Register';
import LogOut from './components/Logout';
import Login from './components/Login';
import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import PublicPost from './components/PublicPost';
import PrivatePost from './components/PrivatePost';

function App() {
  const logedIn = localStorage.getItem('isLogedIn');
  const [stateLoged, setStateLoged] = useState(false);
  const userId = useParams();

  useEffect(() => {
    console.log("App test");
  }, [stateLoged]);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <LogOut setStateLoged={setStateLoged} stateLoged={stateLoged} />
        {logedIn ? (
          <Routes>
            <Route element={<Register setStateLoged={setStateLoged} stateLoged={stateLoged} />} path="/register" default />
            <Route element={<Login setStateLoged={setStateLoged} stateLoged={stateLoged} />} path="/login" default />
            <Route path="/" default element={<Home />} />
            <Route path="/profile/dashboard" default element={<Profile />} />
            <Route path="/profile/createPost" default element={<CreatePost />} />
            <Route path="/profile/home" default element={<PublicPost />} />
            <Route path="/profile/posts" default element={<PrivatePost userId={userId} />} />
          </Routes>
        ) : (
          <Routes>
            <Route element={<Register setStateLoged={setStateLoged} />} path="/register" default />
            <Route element={<Login setStateLoged={setStateLoged} stateLoged={stateLoged} />} path="/login" default />
            <Route path="/" default element={<Home />} />
            <Route path="/profile/dashboard" default element={<Home />} />
            <Route path="/profile/createPost" default element={<Register setStateLoged={setStateLoged} />} />
            <Route path="/profile/home" default element={<Home />} />
          </Routes>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
