import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UserProfile.css';

// MUI
import Button from '@mui/material/Button';
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import exerciseAvatar from '../../images/barbell.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Page Colors
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
  const user = useSelector((store) => store.user);
  return (
    <Box className="container">
      <center>
        <ThemeProvider theme={theme}>
          <div className="profile-container">
            <h2 className="App-header">Hello, {user.name}!</h2>
            <br />
            <Avatar src={exerciseAvatar} sx={{ width: 60, height: 60 }} />
            <br />
            <Card>
              <CardContent>
                <h3>My Info</h3>
                <h4>{user.name}</h4>
                <h4>{user.current_gym}</h4>
                <h4>{user.favorite_lift}</h4>
              </CardContent>
            </Card>
            <br />
            <Button color="secondary" variant="contained" onClick={() => history.push('/edit/profile')}>Edit Profile</Button>
            <LogOutButton className="btn" />
          </div>
        </ThemeProvider>
      </center>
      <Footer />
    </Box>
  );
}

export default UserProfile;