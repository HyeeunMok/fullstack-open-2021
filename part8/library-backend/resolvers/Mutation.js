const { v4: uuid } = require('uuid');

exports.Mutation = {
  addAuthor: (parent, { input }, { db }) => {
    const { name } = input;
    const newAuthor = {
      id: uuid(),
      name,
    };

    db.authors.push(newAuthor);
    return newAuthor;
  },

  addBook: (parent, { input }, { db }) => {
    const { title, published, author, genres } = input;
    const currentAuthor = author;
    const newBook = {
      id: uuid(),
      title,
      published,
      author,
      genres,
    };

    if (
      db.authors.filter(author => author.name === currentAuthor).length === 0
    ) {
      db.authors.push({
        id: uuid(),
        name: currentAuthor,
        born: null,
        bookCount: 1,
      });
    }

    db.books.push(newBook);
    return newBook;
  },

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
