const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String]
  }

  type Author {
    name: String!
    id: ID!
    born: Int!
    bookCount: Int
  }
`;
