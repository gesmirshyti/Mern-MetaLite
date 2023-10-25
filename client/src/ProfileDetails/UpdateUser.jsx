import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
const UpdateUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    description: '',
    userImage: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${userId}`)
      .then((response) => {
        setUserData({
          ...userData,
          name: response.data.name,
          description: response.data.description,
          userImage: response.data.userImage,
        });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    axios
      .patch(`http://localhost:8000/api/profile/update/${userId}`, userData)
      .then((response) => {
        console.log('Profile updated:', response.data);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('desc', response.data.description);
        localStorage.setItem('image', response.data.userImage);
        setFeedbackMessage('Profile updated successfully.');
        setTimeout(() => {
          setFeedbackMessage( <Link to={`/profile/dashboard`}>Back at profile</Link>);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        setFeedbackMessage('Error updating profile. Please try again.');
      });
  };

  return ( <div>
    
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, margin: '20px auto' }}>
        <Typography variant="h5">Update Your Profile</Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="name"
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            multiline
            id="description"
            label="Description"
            name="description"
            value={userData.description}
            onChange={handleInputChange}
            rows={4}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="userImage"
            label="ImageUrl"
            name="userImage"
            value={userData.userImage}
            onChange={handleInputChange}
          />
          <Box mt={2} textAlign="center">
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </Button>
          </Box>
          {feedbackMessage && (
            <Box mt={2} textAlign="center">
              <Typography variant="body2" color="primary">
                {feedbackMessage}
              </Typography>
            </Box>
          )}
        </form>
      </Paper>

    </Container>
        <Footer />
    </div>
  );
};

export default UpdateUser;
