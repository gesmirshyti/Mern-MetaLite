import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Link, Input } from '@mui/material';

const Register = ({setStateLoged}) => {
  const navigate = useNavigate();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [val,setVal]= useState({})
  const [confirmPassword,setConfirmPassword]= useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register', {
      name,
      email,
      password,
      confirmPassword
    }, { withCredentials: true })
    .then(res=>{
                      console.log(res); // always console log to get used to tracking your data!
                      console.log(res.data);
      setVal({})
      localStorage.setItem('usertoken', true);
      setStateLoged(true)
      navigate("/login")
                  })
                  .catch(err=>{ console.log(err);err.response.data.errors? setVal(err.response.data.errors): console.log(err)})
      
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          User Registration
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          { val.name? <p>{val.name.message}</p> : "" }
            <TextField
              fullWidth
              label="Username"
              name="name"
              value={name}
              onChange = {(e)=>setName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
          { val.email? <p>{val.email.message}</p> : "" }

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange = {(e)=>setEmail(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
          {val.password ? <p>{val.password.message}</p> : ""}

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
          { val.confirmPassword? <p>{val.confirmPassword.message}</p> : "" }
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Register
        </Button>
        <Typography variant="body1" align="center" gutterBottom>
          Already Registered? <Link to="/login">Log in</Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Register;
