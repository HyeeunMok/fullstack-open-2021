const dummy = blogs => 1;

const totalLikes = blogs => {
  const total = blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
  return total;
};

module.exports = {
  dummy,
  totalLikes,
};
