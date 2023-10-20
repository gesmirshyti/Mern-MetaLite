import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LogOut = ({stateLogged,setStateLogged}) => {
    const navigate = useNavigate()

    const logOutFunc = ()=>{
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
        .then(res =>  {localStorage.removeItem('isLoggedIn'); setStateLogged(false);navigate("/signin")})
        .catch(err=> alert("Something went wrong with LogOut",err))
    }
    return (
      <input type="button" value={"logout"} onClick={logOutFunc} />
    )
}
export default LogOut;