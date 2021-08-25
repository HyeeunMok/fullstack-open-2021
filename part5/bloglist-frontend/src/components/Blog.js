import React, { useState } from 'react';
import styles from './Blog.module.css';

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleShow = () => {
    setShowDetails(!showDetails);
  };

  const likeHandler = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(blog.id, updatedBlog);
  };

  const removeHandler = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    removeBlog(blog.id);
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
            likes: {blog.likes}
            <button data-cy="like-button" onClick={likeHandler}>
              Like
            </button>
            <br />
            {blog.user.name}
          </p>
          <button onClick={removeHandler}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
