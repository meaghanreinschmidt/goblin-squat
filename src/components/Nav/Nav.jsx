import React from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';

// MUI
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import GradingIcon from '@mui/icons-material/Grading';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="navbar">
      {/* If a user is logged in, show these links */}
      {user.id && (
        <BottomNavigation
          sx={{
            width: 350, backgroundColor: '#2d2d2d', "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
              color: '#f5f5f5'
            }
          }}
          value={value}
          onChange={(event, setValue) => handleChange(event, setValue)}
        >
          <BottomNavigationAction className="link" label="Home" icon={<HomeIcon />}
            onClick={() => { history.push('/user') }} />

          <BottomNavigationAction className="link" label="Log" icon={<GradingIcon />}
            onClick={() => { history.push('/workout/log') }} />

          <BottomNavigationAction className="link" label="Progress" icon={<LeaderboardIcon />}
            onClick={() => { history.push('/progress/chart') }} />

          <BottomNavigationAction className="link" label="Profile" icon={<AccountCircleIcon />}
            onClick={() => { history.push('/user/profile') }} />

        </BottomNavigation>
      )}
    </div>
  )
}

export default Nav;
