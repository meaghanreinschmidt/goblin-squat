import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';

function UserProfile() {
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <Box className="container">
      <center>
      <h3>Hello, {user.username}!</h3>
      {/* <p>Your ID is: {user.id}</p> */}
      <br />
      <FitnessCenterIcon></FitnessCenterIcon>
      <br />
      <br />
      <Button onClick={() => history.push('/edit/profile')}>Edit Profile</Button>
      <br />
      <br />
      <LogOutButton className="btn" />
      </center>
      <br />
      <br />
      <br />
      <Footer />
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default UserProfile;