import React, { useEffect, useRef, Fragment } from 'react';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs, addBlog } from './reducers/blogReducer';
import {
  setSuccessMessage,
  setWarningMessage,
} from './reducers/notificationReducer';
import { setUser } from './reducers/userReducer';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import Users from './components/Users';
import SingleUser from './components/SingleUser';
import Navigation from './components/Navigation';
import styles from './App.module.css';

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

  const blogForm = () => (
    <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  const matchUserId = useMatch('/users/:id');
  const userBlogs = matchUserId
    ? blogs.filter(blog => blog.user.id === matchUserId.params.id)
    : null;

  const matchBlogId = useMatch('/blogs/:id');
  const currentBlog = matchBlogId
    ? blogs.find(blog => blog.id === matchBlogId.params.id)
    : null;

  return (
    <div>
      <Navigation />
      {notification && <Notification message={notification} />}
      <Routes>
        <Route path="/users/:id">
          <Route path="/users/:id" element={<SingleUser blogs={userBlogs} />} />
        </Route>
        <Route path="/blogs/:id">
          <Route path="/blogs/:id" element={<Blog blog={currentBlog} />} />
        </Route>
        <Route path="/users">
          <Route path="/users" element={<Users blogs={userBlogs} />} />
        </Route>
        <Route path="/">
          {user === null ? (
            <Route path="/" element={<LoginForm />}></Route>
          ) : (
            <Route
              path="/"
              element={
                <Fragment>
                  <h2>Blogs</h2>
                  {blogForm()}
                  {blogs
                    .sort((min, max) => max.likes - min.likes) // Descending order
                    .map(blog => (
                      <div
                        key={blog.id}
                        blog={blog}
                        className={styles.blogStyle}
                      >
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </div>
                    ))}
                  <Users />
                </Fragment>
              }
            ></Route>
          )}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
