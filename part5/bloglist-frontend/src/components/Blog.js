import React, { useState, Fragment } from 'react';
import styles from './Blog.module.css';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleShow = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={styles.blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={toggleShow}>{showDetails ? 'Hide' : 'Show'}</button>
      {showDetails && (
        <>
          <p>
            {blog.url}
            <br />
            likes: {blog.likes}
            <button>likes</button>
            <br />
            {blog.user.name}
          </p>
        </>
      )}
    </div>
  );
};

export default Blog;
