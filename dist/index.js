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
          console.log(context.req.cookie)
          if (context.req.cookie[token] == 'Some token') {
            return context.req.cookie
          }
            else {
              return false
          } 
        }
    },
    Mutation: {
      auth: (_, __, { res }) => {
        try {
          res.cookie("token", "Some token", {
            httpOnly: true
          });
          return "Some token";
        } catch (error) {
          return "error";
        }
      }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    networkInterface
});
const { url } = await startStandaloneServer(server, {
    context: ({ req, res }) => {
      return { req, res };
    },
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
