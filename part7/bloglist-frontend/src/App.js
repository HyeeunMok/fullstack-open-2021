import React, { useEffect, useRef, Fragment } from 'react';
import LoginForm from './components/LoginForm';
// import BlogList from './components/BlogList';
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
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import Users from './components/Users';
import SingleUser from './components/SingleUser';

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

  const userInfo = () => (
    <div>
      {user.name} logged in{' '}
      <button data-cy="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );

  const blogForm = () => (
    <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  const match = useMatch('/users/:id');
  const userBlogs = match
    ? blogs.filter(blog => blog.user.id === match.params.id)
    : null;

  return (
    <div>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {notification && <Notification message={notification} />}
      <Routes>
        <Route path="/users/:id">
          <Route path="/users/:id" element={<SingleUser blogs={userBlogs} />} />
        </Route>
        <Route path="/users">
          <Route path="/users" element={<Users blogs={userBlogs} />} />
        </Route>
        {user === null ? (
          <Route path="/" element={<LoginForm />}></Route>
        ) : (
          <Route
            path="/"
            element={
              <Fragment>
                <h2>Blogs</h2>
                {userInfo()}
                {/* {blogForm()} */}
                {/* <BlogList blogs={blogs} /> */}
                <Users />
              </Fragment>
            }
          ></Route>
        )}
      </Routes>
    </div>
  );
};

export default App;
