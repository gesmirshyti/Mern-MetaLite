import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Button from '@mui/material-next/Button';

export default function Home() {
  const navigate = useNavigate();

  const handleTryNowClick = () => {
    // Navigate to the desired route when the button is clicked
    navigate('/register'); // Replace '/desired-route' with the actual route you want to navigate to
  };

  return (
    <div>
      <div className="home-container d-flex">
        <div className="col-lg-7  col-1-home">
          <img className="home-img" src="https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg" alt="image" />
        </div>
        <div className="col-lg-5  col-2-home">
          <h1>Welcome to Home <span>Page</span></h1>
          <Button
            onClick={handleTryNowClick} // Call the handler function when the button is clicked
            size="large"
            variant="elevated"
            sx={{ backgroundColor: 'lightblue', color: 'black' }}
          >
            Try Now
          </Button>
        </div>
      </div>
    </div>
  );
}
