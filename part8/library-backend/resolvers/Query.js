exports.Query = {
  bookCount: (parent, args, { db }) => db.books.length,

  authorCount: (parent, args, { db }) => db.authors.length,

  allBooks: (parent, { filter }, { db }) => {
    let filteredBooks = db.books;
    if (filter) {
      const { author, genre } = filter;
      if (author !== undefined && genre !== undefined) {
        filteredBooks = filteredBooks
          .filter(book => book.author === author)
          .filter(book => book.genres.includes(genre));
      }
      if (author !== undefined) {
        filteredBooks = filteredBooks.filter(book => book.author === author);
      }
      if (genre !== undefined) {
        filteredBooks = filteredBooks.filter(book =>
          book.genres.includes(genre)
        );
      }
    }
    return filteredBooks;
  },

  allAuthors: (parent, args, { db }) => db.authors,
};
