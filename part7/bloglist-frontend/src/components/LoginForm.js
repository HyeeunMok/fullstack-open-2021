import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div data-cy="login-form">
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            data-cy="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password{' '}
          <input
            data-cy="password"
            type="text"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button data-cy="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};

export default LoginForm;
