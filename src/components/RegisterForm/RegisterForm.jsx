import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import './RegisterForm.css';
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

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [currentGym, setCurrentGym] = useState('');
  const [favoriteLift, setFavoriteLift] = useState('');
  
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        name: name,
        current_gym: currentGym,
        favorite_lift: favoriteLift
      },
    });
  }; // end registerUser

  return (
    <div className="container">
      <center>
    <form className="formPanel" onSubmit={registerUser}>
    <h2 className="App-header">Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <p>username</p>
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div>
        <p>password</p>
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div>
        <p>name</p>
          <input 
            type="name"
            name="name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
      </div>
      <div>
        <p>current gym</p>
          <input 
            type="current_gym"
            name="current_gym"
            value={currentGym}
            onChange={(event) => setCurrentGym(event.target.value)}
        />
      </div>
      <div>
        <p>favorite lift</p>
          <input  
            type="favorite_lift"
            name="favorite_lift"
            value={favoriteLift}
            onChange={(event) => setFavoriteLift(event.target.value)}
        />
      </div>
      <br />
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
      <br />
      <ThemeProvider theme={theme}>
      <Button
          className="btn btn_asLink"
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push('/user');
          }}
        >
          Cancel
        </Button>
        </ThemeProvider>
    </form>
    </center>
    </div>
  );
}

export default RegisterForm;
