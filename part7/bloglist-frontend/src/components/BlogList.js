import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs }) => {
  return (
    <div data-cy="blog-list">
      {blogs
        .sort((min, max) => max.likes - min.likes) // Descending order
        .map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
