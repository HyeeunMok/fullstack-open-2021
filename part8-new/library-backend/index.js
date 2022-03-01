const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const config = require('./utils/config');
const Author = require('./models/author');
const Book = require('./models/book');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

mongoose.set('debug', true);

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        if (args.author && args.genre) {
          const authorId = await Author.find({ name: args.author }).select(
            'id'
          );
          return await Book.find({
            author: authorId,
            genres: { $in: [args.genre] },
          }).populate('author');
        } else if (args.author && !args.genre) {
          const authorId = await Author.find({ name: args.author }).select(
            'id'
          );
          return await Book.find({ author: authorId }).populate('author');
        } else if (!args.author && args.genre) {
          return await Book.find({ genres: { $in: [args.genre] } }).populate(
            'author'
          );
        }
        return await Book.find({}).populate('author');
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    // books.filter(book => {
    //   if (args.author && book.author !== args.author) {
    //     return null;
    //   }
    //   if (args.genre && !book.genres.includes(args.genre)) {
    //     return null;
    //   }
    //   return book;
    // }),
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async root => {
      return await Book.find({ author: root.id }).countDocuments();
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let authorId = await Author.findOne({ name: args.author }).select(
          '_id'
        );
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
        });
        if (authorId === null) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
          authorId = newAuthor._id;
        }
        book.author = authorId;
        await book.save();
        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    editAuthor: async (root, args) => {
      try {
        const authorId = await Author.find({ name: args.name }).select('id');
        return await Author.findByIdAndUpdate(
          authorId,
          { born: args.born },
          { new: true, upsert: true }
        );
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
