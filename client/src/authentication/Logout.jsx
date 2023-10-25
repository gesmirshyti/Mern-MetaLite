import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogOut = ({stateLogged,setStateLogged}) => {
    const navigate = useNavigate()

    const logOutFunc = ()=>{
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
        .then(res =>  {localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('name');
        localStorage.removeItem('userId');
        localStorage.removeItem('postId'); 
        setStateLogged(false);
        navigate("/signin")})
        .catch(err=> alert("You have been Logged Out, Reload to Sign In again",navigate("/signin")))
    }
    return (
      
      <Button className='' type="button" value={"logout"} onClick={logOutFunc}> <p className='white'> LogOut</p></Button>
    )
}
export default LogOut;