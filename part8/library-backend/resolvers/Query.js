exports.Query = {
  bookCount: (parent, args, { db }) => db.books.length,

  authorCount: (parent, args, { db }) => db.authors.length,

  allBooks: (parent, { filter }, { db }) => {
    let filteredBooks = db.books;
    if (filter) {
      const { author } = filter;
      filteredBooks = filteredBooks.filter(book => book.author === author);
    }
    return filteredBooks;
  },

  allAuthors: (parent, args, { db }) => db.authors,
};
