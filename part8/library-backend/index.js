const { ApolloServer, gql } = require('apollo-server');
const { db } = require('./db');
const { typeDefs } = require('./schema');
const { Query } = require('./resolvers/Query');
const { Author } = require('./resolvers/Author');
const { Mutation } = require('./resolvers/Mutation');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Author,
    Mutation,
  },
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
