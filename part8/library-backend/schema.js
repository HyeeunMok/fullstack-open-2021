const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String]
  }
`;
