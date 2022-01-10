import React, { useState } from 'react';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import {
  setSuccessMessage,
  setWarningMessage,
} from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import styles from './Blog.module.css';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const toggleShow = () => {
    setShowDetails(!showDetails);
  };

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

  return (
    <div className={styles.blogStyle}>
      {blog.title} by {blog.author}
      <button data-cy="view-button" onClick={toggleShow}>
        {showDetails ? 'Hide' : 'View'}
      </button>
      {showDetails && (
        <div className="blogDetails">
          <p>
            {blog.url}
            <br />
            <span data-cy="likes">likes: {blog.likes}</span>
            <button data-cy="like-button" onClick={likeHandler}>
              Like
            </button>
            <br />
            {blog.user.name}
          </p>
          <button data-cy="delete-button" onClick={removeHandler}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
