import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer';
import {
  setSuccessMessage,
  setWarningMessage,
} from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import blogService from '../services/blogs';
import styles from './Blog.module.css';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allowRemove, setAllowRemove] = useState(false);

  useEffect(() => {
    const user = blogService.getUserInfo();
    const blogUser = blog.user.id || blog.user;
    setAllowRemove(blogUser === user.id);
  }, [blog.user]);

  const addLike = (id, likes) => {
    try {
      dispatch(likeBlog(id, likes + 1));
      dispatch(
        setSuccessMessage(
          `One like added to blog ${blog.title} by ${blog.author}`
        )
      );
    } catch (error) {
      dispatch(setWarningMessage(error));
    }
  };

  const removeBlog = () => {
    const result = window.confirm(
      `Do you want to delete ${blog.title} by ${blog.author}?`
    );

    if (result) {
      try {
        dispatch(
          setSuccessMessage(`blog ${blog.title} by ${blog.author} was deleted.`)
        );
        console.log(blog.id);
        dispatch(deleteBlog(blog.id));
        navigate('/');
      } catch (error) {
        dispatch(setWarningMessage(error));
      }
    }
  };

  const likeHandler = () => {
    addLike(blog.id, blog.likes);
    console.log(blog.id);
    console.log(blog.likes);
  };

  const removeHandler = () => {
    removeBlog(blog);
  };

  const createComment = event => {
    event.preventDefault();
    dispatch(addComment(blog.id, event.target.comment.value));
    event.target.comment.value = '';
  };

  return (
    <div className={styles.blogStyle}>
      <h1>Blog app</h1>
      <h1>{blog.title}</h1>
      <div className="blogDetails">
        <a href={blog.url}>{blog.url}</a>
        <p>
          <span data-cy="likes">likes: {blog.likes}</span>
          <button data-cy="like-button" onClick={likeHandler}>
            Like
          </button>
          <br />
          added by {blog.author}
        </p>
        {allowRemove && (
          <button
            data-cy="delete-button"
            className="removeButton"
            onClick={removeHandler}
          >
            Remove
          </button>
        )}
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={createComment}>
          <input type="text" name="comment" />
          <button type="submit">Add comment</button>
        </form>
        <ul>
          {blog.comments.map(comment => (
            <li key={comment.id}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
