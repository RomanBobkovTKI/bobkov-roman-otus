import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql/error/GraphQLError.js';

const typeDefs = `#graphql

  type Query {
    confirm: Boolean
  }

  type Mutation {
    auth: String!
  }

`;

interface MyContext {
  token?: String;
}

const resolvers = {
    Query: {
      confirm: (_, __, context) => {
        if (context.token == 'Some token')
        return true
      }
    },

    Mutation: {
      auth: () => 'Some token'
    }
};

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
