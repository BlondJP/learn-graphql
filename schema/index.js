const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const { books, authors } = require("./collections");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) =>
        authors.find(({ id }) => id === parent.author_id)
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) =>
        books.filter(book => parent.id === book.author_id)
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, // param we need to resolve
      resolve: (parent, args) => books.find(({ id }) => args.id === id) // resolver
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => authors.find(({ id }) => args.id === id)
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => authors
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
