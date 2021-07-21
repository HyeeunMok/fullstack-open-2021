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
    _id: max._id,
    title: max.title,
    author: max.author,
    url: max.url,
    likes: max.likes,
    __v: max.__v,
  };

  return favBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
