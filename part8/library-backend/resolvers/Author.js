exports.Author = {
  bookCount: (parent, args, { db }) => {
    return db.books.filter(book => book.author === parent.name).length;
  },
};
