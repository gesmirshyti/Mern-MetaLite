import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import Footer from './Footer';
const About = () => {
  return (
  <div>
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        About Us
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://media.istockphoto.com/id/1400054917/photo/portrait-of-young-trendy-beautiful-mixed-race-woman-with-an-afro-smiling-and-posing-for-a.webp?b=1&s=170667a&w=0&k=20&c=OQKeDSBzIFkhuiVikBq-1PNbuIMcdNgHcZZIraeF1PQ="
              alt="Image 1"
            />
            <CardContent>
              <Typography variant="h5">Our Mission</Typography>
              <Typography variant="body1">
Our mission is simple yet powerful: to connect you to what matters most. We believe that in today's fast-paced digital world, genuine connections 
and meaningful interactions are more important than ever.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://th.bing.com/th/id/OIP.V67hej0dNIeOLFuF6ImrnQHaE8?pid=ImgDet&rs=1"
              alt="Image 2"
            />
            <CardContent>
              <Typography variant="h5">Our Team</Typography>
              <Typography variant="body1">
Driven To Connect People and make them feel closer with each other.Our platform is designed to make those connections possible.Feel safe and secure knowing that your data is protected, and you have control over your online experience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Typography variant="h5" align="center">
          Introduction About Us
        </Typography>
        <Typography variant="body1" paragraph>
        At Meta<span>Lite</span>, we believe in connecting people, fostering meaningful relationships, and creating a space for shared experiences. Our platform is more than just a social network; it's a place where you can express yourself, engage with others, and explore the world together.        </Typography>
      </Box>
    </Container>
          <Footer></Footer>

        </div>
  );
};

export default About;
