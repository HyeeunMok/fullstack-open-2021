exports.Query = {
  bookCount: (parent, args, { db }) => db.books.length,

  authorCount: (parent, args, { db }) => db.authors.length,
};
