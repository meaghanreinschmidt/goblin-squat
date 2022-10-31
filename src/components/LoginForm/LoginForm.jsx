import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div className="container">
      <center>
        <form className="formPanel" onSubmit={login}>
          <h2 className="App-header">Welcome to goblin squat!</h2>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
          <div>
            <p>username</p>
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <p>password</p>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <br />
          <div>
            <input className="btn" type="submit" name="submit" value="Sign In" />
          </div>
        </form>
      </center>
      <br />
      <center>
        <p className="newUser">New User?</p>
        <input
          type="button"
          className="other-btn"
          value="Register"
          onClick={() => {
            history.push('/registration');
          }}
        />
        <br />
        <br />
        <Footer />
      </center>
    </div>
  );
}

export default LoginForm;
