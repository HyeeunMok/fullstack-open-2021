import blogService from '../services/blogs';
import loginService from '../services/login';
import { setSuccessMessage, setWarningMessage } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.data;
    }
    case 'LOGOUT_USER': {
      return null;
    }
    default: {
      return state;
    }
  }
};

export const setUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    return {
      type: 'SET_USER',
      data: user,
    };
  }
  return { type: 'LOGOUT_USER' };
};

export const userLogout = () => {
  window.localStorage.removeItem('loggedBlogUser');
  return {
    type: 'LOGOUT_USER',
  };
};

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser());
      dispatch(setSuccessMessage(`${user.username} successfully logged in`));
    } catch (error) {
      console.log('wrong credentials', error);
      dispatch(setWarningMessage('Wrong username or password'));
    }
  };
};

export default userReducer;
