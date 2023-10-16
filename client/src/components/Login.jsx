import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
const Login = ({ setStateLoged,userId }) => {
    const navigate = useNavigate()
    //keep track of what is being typed via useState hook

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [val, setVal] = useState({})


    //handler when the form is submitted
    const onSubmitHandler = (e) => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        axios.post('http://localhost:8000/api/login', {

            email,
            password,

        }, { withCredentials: true })
            .then(res => {
                console.log(res); // always console log to get used to tracking your data!
                console.log(res.data);

                setVal({})
                localStorage.setItem('isLogedIn', true);
                const userId = response.data.userId; // Replace this with how you extract the user ID from the login response
localStorage.setItem('userId', userId);
                setStateLoged(true)
                navigate("/")
            })
            .catch(err => { console.log(err); err.response.data.errors ? setVal(err.response.data.errors) : console.log(err) })
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <p>Log in</p>
            <div>
            {val.email ? <p>{val.email.message}</p> : ""}
            <label>Email</label><br />
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            {val.password ? <p>{val.password.message}</p> : ""}
            <label>Password</label><br />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
</div>

            <Button type="submit" variant="contained" color="primary">
                Log in
            </Button>        </form>
    )
}
export default Login;