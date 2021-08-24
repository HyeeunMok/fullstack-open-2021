import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, updateBlog }) => {
  return (
    <div>
      {blogs
        .sort((min, max) => max.likes - min.likes) // Descending order
        .map(blog => (
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
        ))}
    </div>
  );
};

export default BlogList;
