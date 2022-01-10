import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send auth request to server
    props.onLoggedIn(username);
  };

  // Register button click needed

  return (
    <div className="login-view">
      <h2>Login to myFlix</h2>

      <form className="login-form">
        <div className="login-form__line">
          <label className="login-form__line__label">Username:</label>
          <input
            className="login-form__line__input-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login-form__line">
          <label className="login-form__line__label">Password:</label>
          <input
            className="login-form__line__input-field"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="login-form__login-button"
          type="submit"
          onClick={handleSubmit}
        >
          Log in
        </button>
      </form>

      <div>
        <span>Don't have an account? </span>
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
  );
}

// prop-types
// Give informational warnings in browser if data does not match required shape
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
