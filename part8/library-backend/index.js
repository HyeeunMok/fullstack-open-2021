const { ApolloServer, gql } = require('apollo-server');
const { typeDefs } = require('./schema');
const { Query } = require('./resolvers/Query');
const { Author } = require('./resolvers/Author');
const { db } = require('./db');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Author,
  },
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
