import React, { useState } from 'react';
import styles from './Blog.module.css';

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleShow = () => {
    setShowDetails(!showDetails);
  };

  const likeHandler = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(blog.id, updatedBlog);
  };

  return (
    <div className={styles.blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={toggleShow}>{showDetails ? 'Hide' : 'View'}</button>
      {showDetails && (
        <>
          <p>
            {blog.url}
            <br />
            likes: {blog.likes}
            <button onClick={likeHandler}>Like</button>
            <br />
            {blog.user.name}
          </p>
        </>
      )}
    </div>
  );
};

export default Blog;
