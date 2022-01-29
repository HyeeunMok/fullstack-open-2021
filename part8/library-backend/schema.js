const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(filter: BooksFilterInput): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(input: AddBookInput!): Book!
    addAuthor(input: AddAuthorInput!): Author!
    updateAuthor(name: String!, input: updateAuthorInput!): Author
  }

  type Book {
    title: String!
    id: ID!
    published: String!
    author: String!
    genres: [String]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  input BooksFilterInput {
    author: String
    genre: String
  }

  input AddBookInput {
    title: String!
    published: String!
    author: String!
    genres: [String]
  }

  input AddAuthorInput {
    name: String!
    born: Int
    bookCount: Int
  }

  input updateAuthorInput {
    name: String
    born: Int
    bookCount: Int
  }
`;
