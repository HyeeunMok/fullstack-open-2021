import React from 'react';

const SingleUser = ({ blogs }) => {
  if (!blogs[0]) return <p>No blogs!</p>;

  return (
    <div>
      <h2>{blogs[0].user.name}</h2>
      <h5>added blogs</h5>
      <ul>
        {blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default SingleUser;
