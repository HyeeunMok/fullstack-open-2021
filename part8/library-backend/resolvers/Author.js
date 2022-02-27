const Book = require('../models/Book');

// exports.Author = {
//   bookCount: (parent, args) => {
//     return Book.count({ author: args.author });
//   },
// };

exports.Author = {
  bookCount: parent => {
    return Book.count({ author: parent.author });
  },
};
