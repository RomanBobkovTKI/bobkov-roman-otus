import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs = `#graphql

  type Query {
    confirm: Boolean
  }

  type Mutation {
    auth: String!
  }

`;
const resolvers = {
    Query: {
        confirm: (_, __, context) => {
          if (context.token == 'Some token') {
            return true
          }
            else {
              return false
          } 
        }
    },
    Mutation: {
        auth: () => 'Some token'
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
