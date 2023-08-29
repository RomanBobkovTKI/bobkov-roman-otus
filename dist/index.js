import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs = `#graphql

  type Book {
    title: String
    author: String
  }

  type Token {
    token: String!
  }

  type Text {
    info: String
  }

  type Query {
    books: [Book],
    confirm: Text
  }

  type Mutation {
    auth: Token!
  }

`;
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
const info = {
    info: 'Some text'
};
const token = {
    token: 'Some token'
};
const resolvers = {
    Query: {
        books: () => books,
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
