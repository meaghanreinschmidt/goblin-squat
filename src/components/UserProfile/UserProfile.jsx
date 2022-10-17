import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function UserProfile() {
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <center>
      <h2>hello, {user.username}</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <br />
      <Button onClick={() => history.push('/edit/profile')}>Edit Profile</Button>
      <br />
      <LogOutButton className="btn" />
      </center>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserProfile;