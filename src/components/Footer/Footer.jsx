import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { useSelector } from 'react-redux';


function Footer() {
  const user = useSelector((store) => store.user);
  return <footer className="App-footer">
    {/* <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link> */}
      <div>
        {/* If no user is logged in, show these links */}
        {/* {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )} */}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/completed/exercises">
              Completed Exercises
            </Link>

            <Link className="navLink" to="/progress/chart">
              Progress Chart
            </Link>

            <Link className="navLink" to="/user/profile">
              User Profile
            </Link>
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
        </footer>
}

export default Footer;
