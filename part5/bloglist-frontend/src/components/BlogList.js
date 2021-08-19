import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, user, handleLogout }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
