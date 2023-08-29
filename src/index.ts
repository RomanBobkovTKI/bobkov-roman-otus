import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql

  type Token {
    token: String!
  }

  type Text {
    info: String
  }

  type Query {
    confirm: Text
  }

  type Mutation {
    auth: Token!
  }

`;

const info = {
  info: 'Some text'
}

const token = {
  token: 'Some token'
} 

const resolvers = {
    Query: {
      confirm: () => info
    },

    Mutation: {
      auth: () => token
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