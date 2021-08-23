import React, { useState, useEffect, useRef, Fragment } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [warning, setWarning] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
      showNotification(`${user.username} successfully logged in`);
    } catch (error) {
      console.log('wrong credentials', error);
      setWarning(true);
      showNotification('Wrong username or password');
    }
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleLogout = event => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem('loggedBlogUser');
    showNotification('Logged out');
  };

  const createBlog = async newBlogObject => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(newBlogObject);
      setBlogs(blogs.concat(newBlog));
      showNotification(
        `A new blog ${newBlog.title} by ${newBlog.author} added.`
      );
    } catch (error) {
      console.log(error);
      setWarning(true);
      showNotification(`${error.response.data.message}`);
    }
  };

  const showNotification = message => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
      setWarning(false);
    }, 3000);
  };

  return (
    <div>
      {notification && (
        <Notification message={notification} warning={warning} />
      )}
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      ) : (
        <Fragment>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <BlogList blogs={blogs} />
        </Fragment>
      )}
    </div>
  );
};

export default App;
