import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import io from 'socket.io-client';
import Footer from './Footer';

const ContactForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactDescription: '',
    location: '',
  });
  const [val, setVal] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [socket] = useState(() => io(':8000'));
  const [socketMessage, setSocketMessage] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    socket.on('Welcome', data => {
      setSocketMessage(data); 
    });
 
    return () => socket.off("Welcome");
  }, [socket]);

  const handleSubmit = (e) => {      
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/contact', formData)
      .then((res) => {
        console.log(res.data);
        setVal({});
        setIsSubmitted(true);

        setFormData({
          contactName: '',
          contactEmail: '',
          contactDescription: '',
          location: '',
        });
      })
      .catch((err) => {
        console.log(err);
        err.response.data.errors
          ? setVal(err.response.data.errors)
          : console.log(err);
      });
  };

  useEffect(() => {
    const index = randomIndex(1, 10);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${index}`)
      .then((res) => {
        console.log(res.data);
        setData({
            name: res.data.name,
            email: res.data.email,
            location: res.data.address.street,
            descripton: res.data.company.catchPhrase
        });
      })
      .catch((err) => console.log(err));
  },[])

  const randomIndex = (min, max) => { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  const submitFakeContact = () => {
    const fakeContact = {
      contactName: data.name,
      contactEmail: data.email,
      contactDescription: data.descripton,
      location: data.location,
    };

    axios
      .post('http://localhost:8000/api/contact', fakeContact)
      .then((res) => {
        console.log('Fake Contact Submitted:', res.data);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log('Error submitting fake contact:', err);
      });
  };

  return (
    <div>
    <Container maxWidth="md">
      <br /><br />
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {val.contactName ? <p className='validation'>{val.contactName.message}</p> : ""}
              <TextField
                fullWidth
                label="Name"
                name="contactName"
                variant="outlined"
                value={formData.contactName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {val.contactEmail ? <p className='validation'>{val.contactEmail.message}</p> : ""}
              <TextField
                fullWidth
                label="Email"
                name="contactEmail"
                variant="outlined"
                value={formData.contactEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {val.contactDescription ? <p className='validation'>{val.contactDescription.message}</p> : ""}
              <TextField
                fullWidth
                label="Description"
                name="contactDescription"
                variant="outlined"
                multiline
                rows={4}
                value={formData.contactDescription}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {val.location ? <p className='validation'>{val.location.message}</p> : ""}
              <TextField
                fullWidth
                label="Location"
                name="location"
                variant="outlined"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box mt={2} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={submitFakeContact}>
              Submit Fake Contact
            </Button>
          </Box>
        </form>
      ) : (
        <Typography variant="h6" color="primary" align="center">
                <Alert >{socketMessage}</Alert>
 <br />
        </Typography>
      )}
    </Container>
    <br /><br />
          <Footer></Footer>
</div>
  );
};

export default ContactForm;