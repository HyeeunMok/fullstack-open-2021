const { v4: uuid } = require('uuid');
const { UserInputError } = require('apollo-server');
const Author = require('../models/Author');
const Book = require('../models/Book');

exports.Mutation = {
  // addAuthor: (parent, { input }, { db }) => {
  //   const { name } = input;
  //   const newAuthor = {
  //     id: uuid(),
  //     name,
  //   };

  //   db.authors.push(newAuthor);
  //   return newAuthor;
  // },
  addAuthor: (parent, { input }) => {
    const { name } = input;
    const newAuthor = new Author({
      id: uuid(),
      name,
    });

    return newAuthor.save();
  },

  addBook: async (parent, { input }) => {
    console.log(input);
    const book = new Book({
      ...input,
      author: new Author({
        name: args.author,
      }),
    });
    try {
      await book.save();
      const check = await Author.exists({ name: book.author.name });
      if (!check) {
        const author = new Author({ name: book.author.name });
        await author.save();
      }
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidInput: input,
      });
    }
    return book;
  },

  // addBook: (parent, { input }, { db }) => {
  //   const { title, published, author, genres } = input;
  //   const currentAuthor = author;
  //   const newBook = {
  //     id: uuid(),
  //     title,
  //     published,
  //     author,
  //     genres,
  //   };

  //   if (
  //     db.authors.filter(author => author.name === currentAuthor).length === 0
  //   ) {
  //     db.authors.push({
  //       id: uuid(),
  //       name: currentAuthor,
  //       born: null,
  //       bookCount: 1,
  //     });
  //   }

  //   db.books.push(newBook);
  //   return newBook;
  // },

  updateAuthor: (parent, { name, input }, { db }) => {
    const index = db.authors.findIndex(author => author.name === name);
    if (index === -1) return null;
    db.authors[index] = {
      ...db.authors[index],
      ...input,
    };
    return db.authors[index];
  },
};
