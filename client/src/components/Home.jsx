import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from '@mui/material-next/Button';
import Footer from './Footer';

export default function Home() {
  const navigate = useNavigate();

  const handleTryNowClick = () => {
    navigate('/register'); 
  };

  return (
    <div>
      <div className="home-container d-flex">
        <div className="col-lg-7  col-1-home">
          <img className="home-img" src="https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg" alt="image" />
        </div>
        <div className="tryNow col-lg-5  col-2-home">
          <h1 className="home-h1">Welcome to Meta<span className="blue">Lite</span></h1> <br /><br /><br />
          <Button
            onClick={handleTryNowClick} 
            size="large"
            variant="elevated"
            sx={{ backgroundColor: 'lightblue', color: 'black' }}
          >
<Link className="black" to={"/signin"}>Try Now</Link>          </Button>
        </div>
      </div>
<Footer></Footer> 
   </div>
  );
}
