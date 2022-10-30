import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import exerciseAvatar from '../../images/barbell.jpg';
import Typography from '@mui/material/Typography';
import './UserProfile.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2d2d2d'
    }, 
    secondary: {
      main: '#FA6318'
    }
  }
})

function UserProfile() {
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <Box className="container">
      <center>
      <ThemeProvider theme={theme}>
      <div className="profile-container">
      <h2 className="App-header">Hello, {user.name}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <br />
      <Avatar src={exerciseAvatar} sx={{ width: 60, height: 60 }} />
        {/* <FitnessCenterIcon />
      </Avatar> */}
      <br />
      <Card>
        <CardContent>
          <h3>My Info</h3>
          <h4>Name: {user.name}</h4>
          <h4>Current Gym: {user.current_gym}</h4>
          <h4>Favorite Lift: {user.favorite_lift}</h4>
        </CardContent>
      </Card>
      <br />
      <Button  color="secondary" variant="contained" onClick={() => history.push('/edit/profile')}>Edit Profile</Button>
      <LogOutButton className="btn" />
      </div>
      </ThemeProvider>
      </center>
      <Footer />
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default UserProfile;