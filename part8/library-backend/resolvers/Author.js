exports.Author = {
  bookCount: (parent, args, { db }) => {
    return Book.count({ author: args.author });
  },
};
