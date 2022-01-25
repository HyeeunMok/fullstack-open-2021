const { ApolloServer, gql } = require('apollo-server');
const { db } = require('./db');

const typeDefs = gql`
  type Query {
  }
`;

const resolvers = {
  Query: {},
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
