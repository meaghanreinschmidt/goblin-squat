import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserProfile() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <center>
      <h2>{user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      
      <h4>User Profile</h4>
      <p>Edit Profile Button</p>
      <LogOutButton className="btn" />
      </center>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserProfile;