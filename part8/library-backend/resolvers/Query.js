const Author = require('../models/Author');
const Book = require('../models/Book');

exports.Query = {
  // bookCount: (parent, args, { db }) => db.books.length,

  bookCount: () => Book.collection.countDocuments(),

  // authorCount: (parent, args, { db }) => db.authors.length,

  authorCount: () => Author.collection.countDocuments(),

  allBooks: (parent, { filter }) => {
    return Book.find({});
  },

  // allBooks: (parent, { filter }, { db }) => {
  //   let filteredBooks = db.books;
  //   if (filter) {
  //     const { author, genre } = filter;
  //     if (author && genre) {
  //       filteredBooks = filteredBooks
  //         .filter(book => book.author === author)
  //         .filter(book => book.genres.includes(genre));
  //     }
  //     if (author) {
  //       filteredBooks = filteredBooks.filter(book => book.author === author);
  //     }
  //     if (genre) {
  //       filteredBooks = filteredBooks.filter(book =>
  //         book.genres.includes(genre)
  //       );
  //     }
  //   }
  //   return filteredBooks;
  // },

  allAuthors: (parent, args) => {
    return Author.find({});
  },
};

// allAuthors: (parent, args, { db }) => db.authors,
// };
