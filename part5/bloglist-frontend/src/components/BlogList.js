import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, updateBlog }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      ))}
    </div>
  );
};

export default BlogList;
