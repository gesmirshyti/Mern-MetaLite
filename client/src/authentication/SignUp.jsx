import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer'; 

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MetaLite
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({setStateLogged}) {
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
    setStateLogged(true)
    navigate("/signin")
                })
                .catch(err=>{ console.log(err);err.response.data.errors? setVal(err.response.data.errors): console.log(err)})
    
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid className='signIn-Grid' container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            { val.name? <span className='validation'>{val.name.message}</span> : "" }
            
            <TextField
            margin="normal"
            required
            fullWidth
            autoFocus
            label="Name"
            name="name"
            value={name}
            onChange = {(e)=>setName(e.target.value)}
            variant="outlined"
            />
            
            {val.email ? <span className='validation'>{val.email.message}</span> : ""}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            
            />
            {val.password ? <span className='validation'>{val.password.message}</span> : ""}

            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            
              />
            { val.confirmPassword? <span className='validation'>{val.confirmPassword.message}</span> : "" }
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
            />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                  <Link  variant="body2"><Link to={"/signin"}>{"Already have an account? Sign In."}</Link>
                    
                  </Link>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer></Footer>
    </ThemeProvider>
  );
}