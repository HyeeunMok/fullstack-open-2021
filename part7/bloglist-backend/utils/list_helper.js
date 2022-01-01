const { values } = require('lodash');
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

const mostLikes = listOfBlogs => {
  return _.chain(listOfBlogs)
    .groupBy('author')
    .mapValues(author => _.sumBy(author, 'likes'))
    .entries() // _.entries() method is used to create an array of keyed-value pairs for the specified object.
    .map(values => _.zipObject(['author', 'likes'], values))
    .maxBy('likes')
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
