import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Footer.css';
import { useSelector } from 'react-redux';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import GradingIcon from '@mui/icons-material/Grading';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Footer() {

  const user = useSelector((store) => store.user);
  const history = useHistory();

  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log('navigation icon clicked:', value);

  return <footer className="App-footer">
      <div>
        {/* If a user is logged in, show these links */}
        {user.id && (
          <BottomNavigation
            sx={{ width: 350 }}
            value={value}
            onChange={(event, setValue) => handleChange(event, setValue)}  
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />}
              onClick={() => {history.push('/user')}} />

            <BottomNavigationAction label="Log" icon={<GradingIcon />}
              onClick={() => {history.push('/workout/log')}} />

            <BottomNavigationAction label="Progress" icon={<LeaderboardIcon />}
              onClick={() => {history.push('/progress/chart')}} />

            <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />}
              onClick={() => {history.push('/user/profile')}} />

          </BottomNavigation>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
        </footer>
}

export default Footer;
