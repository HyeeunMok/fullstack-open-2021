import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../reducers/userReducer';

// import PropTypes from 'prop-types';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(userLogin(username, password));
    setUsername('');
    setPassword('');
  };
  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <div data-cy="login-form">
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
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

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   handleUsernameChange: PropTypes.func.isRequired,
//   handlePasswordChange: PropTypes.func.isRequired,
// };

export default LoginForm;
