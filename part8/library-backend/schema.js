const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
  }
`;
