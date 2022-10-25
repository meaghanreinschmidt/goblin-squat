import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function UserProfile() {
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <center>
      <br />
      <h3>hello, {user.username}</h3>
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
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserProfile;