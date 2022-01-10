import React, { useEffect, useRef, Fragment } from 'react';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs, addBlog } from './reducers/blogReducer';
import {
  setSuccessMessage,
  setWarningMessage,
} from './reducers/notificationReducer';
import { setUser, userLogout } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const notification = useSelector(state => state.notification);
  const user = useSelector(state => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogout = async () => {
    dispatch(userLogout());
  };

  const createBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(addBlog(blogObject));
      dispatch(
        setSuccessMessage(
          `A new blog ${blogObject.title} by ${blogObject.author} added.`
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(setWarningMessage(`${error.response.data.message}`));
    }
  };

  return (
    <div>
      {notification && <Notification message={notification} />}
      {user === null ? (
        <div>
          <LoginForm />
        </div>
      ) : (
        <Fragment>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in{' '}
            <button data-cy="logout-button" onClick={handleLogout}>
              Logout
            </button>
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
