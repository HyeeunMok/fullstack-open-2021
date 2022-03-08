const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const config = require('./utils/config');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const { argsToArgsConfig } = require('graphql/type/definition');

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
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
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async root => {
      return await Book.find({ author: root.id }).countDocuments();
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

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
        return await Book.findById(book.id).populate('author');
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated');
      }
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
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGene: argsToArgsConfig.favoriteGene,
        });
        return await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });
        if (!user || args.password !== 'secret') {
          throw new UserInputError('Wrong credentials');
        }
        const userForToken = {
          username: user.username,
          id: user._id,
        };
        return { value: jwt.sign(userForToken, config.JWT_SECRET) };
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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLocaleLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
