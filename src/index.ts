import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql

  type Token {
    token: String
  }

  type Query {
    confirm: Boolean
  }

  type Mutation {
    auth(token: String!): [Token]
  }
`;

const token = {
    token: '123'
}

const resolvers = {
    Query: {
      confirm: () => true
    },

    Mutation: {
        auth(_, args, context) {
            
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);