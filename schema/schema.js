const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// fixtures data
const books = [
  { name: "Berserk Tome 01", id: "1", genre: "seinen", author_id: "42" },
  { name: "Naruto Tome 01", id: "2", genre: "shonen", author_id: "1" },
  { name: "Death Note Tome 01", id: "3", genre: "shonen", author_id: "3" },lll
  { name: "Bakuman Tome 01", id: "4", genre: "shonen", author_id: "3" }
];
const authors = [
  { name: "Masashi Kishimoto", id: "1", age: "44" },
  { name: "Eiichirō Oda", id: "2", age: "44" },
  { name: "Tsugumi Ōba", id: "3", age: "40" },
  { name: "Masashi Kishimoto", id: "4", age: "44" }
];

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
      resolve(parent, args) {
        // here we resolve the schema
        const book = books.find(({ id }) => args.id === id);
        return book;
      }
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
