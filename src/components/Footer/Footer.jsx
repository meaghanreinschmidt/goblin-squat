import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import GradingIcon from '@mui/icons-material/Grading';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
            <HomeIcon className="home-button"></HomeIcon>
            </Link>

            <Link className="navLink" to="/exercise/completed">
              <GradingIcon className="completed-button"></GradingIcon>
            </Link>

            <Link className="navLink" to="/progress/chart">
              <LeaderboardIcon className="progress-icon"></LeaderboardIcon>
            </Link>

            <Link className="navLink" to="/user/profile">
              <AccountCircleIcon className="user-icon"></AccountCircleIcon>
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
