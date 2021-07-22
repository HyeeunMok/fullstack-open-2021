const _ = require('lodash');
const dummy = blogs => 1;

const totalLikes = blogs => {
  const total = blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
  return total;
};

const favoriteBlog = blogs => {
  if (!blogs || blogs.length === 0) {
    return null;
  }
  const max = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );

  const favBlog = {
    title: max.title,
    author: max.author,
    likes: max.likes,
  };

  return favBlog;
};

const mostBlogs = listOfBlogs => {
  return _.chain(listOfBlogs)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .maxBy('blogs')
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
