import { MoviesModel } from '../models/movies.js';
import { DirectoriesModel } from '../models/directories.js';

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    movie(id: String): MovieType,
    directory(id: String): DirectoryType,
    movies: [MovieType],
    direcories: [DirectoryType]
  },

  type MovieType {
    id: String!
    name: String
    genre: String
    directorsId: DirectoryType
  },

  type DirectoryType {
    id: String!
    name: String
    age: Int
    movies: [MovieType]
  },

  type Mutation {
    addDirector(name: String!, age: Int): DirectoryType!,
    addMovie(name: String!, genre: String, directorsId: String!): MovieType!,
    deleteDirector(id: String!): DirectoryType!,
    deleteMovie(id: String!): MovieType!,
    updateDirector(id: String!, name: String, age: Int): DirectoryType!,
    updateMovies(id: String!, name: String, genre: String, directorsId: String): MovieType!
  }
`

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
      async movie (_, args) {
        return await MoviesModel.findById(args.id)
      },
      async directory(_, args) {
        return await DirectoriesModel.findById(args.id)
      },
      async movies() {
        return await MoviesModel.find({})
      },
      async direcories () {
        return await DirectoriesModel.find({})
      }
    },

    MovieType: {
      async directorsId (parent) {
          return await DirectoriesModel.findById(parent.directorsId)
      }
    },

    DirectoryType: {
      async movies () {
        return await MoviesModel.find({})
      }
    },

    Mutation: {
      async addDirector(_, args) {
        return await new DirectoriesModel({
          name: args.name,
          age: args.age,
        }).save()
      },

      async addMovie(_, args) {
        return await new MoviesModel({
          name: args.name,
          genre: args.genre,
          directorsId: args.directorsId
        }).save()
      },

      async deleteDirector(_, args) {
        return await DirectoriesModel.findByIdAndDelete(args.id)
      },

      async deleteMovie(_, args) {
        return await MoviesModel.findByIdAndDelete(args.id)
      }, 

      async updateDirector(_, args) {
        return await DirectoriesModel.findByIdAndUpdate(
          args.id,
          {$set: {name: args.name, age: args.age}},
          {new: true}
          )
      },

      async updateMovies(_, args) {
        return await MoviesModel.findByIdAndUpdate(
          args.id,
          {$set: {name: args.name, genre: args.genre, directorsId: args.directorsId}},
          {new: true}
        )
      }

    }
}

export { 
    resolvers,
    typeDefs
}