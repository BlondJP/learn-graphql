const author = require("./author.resolvers");
const book = require("./book.resolvers");

const rootValue = {
  Query: {
    ...author.Query,
    ...book.Query
  },
  Mutation: {
    ...book.Mutation
  },
  Book: {
    ...book.Book
  },
  Author: {
    ...author.Author
  }
};

module.exports = rootValue;
