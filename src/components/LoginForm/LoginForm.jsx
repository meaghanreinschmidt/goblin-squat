import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [heading, setHeading] = useState('Goblin Squat');
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
    <h2 className="App-header">{heading}</h2>
    </center>
    <br />
    <center>
    <form onSubmit={login}>
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
      <div>
        <input className="btn" type="submit" name="submit" value="Sign In" />
      </div>
    </form>
    </center>
    <br />
    <center>
      <h5>New User?</h5>
    <button
      type="button"
      className="btn btn_asLink"
      onClick={() => {
        history.push('/registration');
      }}
    >
      Register Here
    </button>
  </center>
  </div>
  );
}

export default LoginForm;
