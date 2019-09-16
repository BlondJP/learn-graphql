const books = require("../fixtures/books");

module.exports = {
  Query: {
    book: (parent, args) => books.find(({ id }) => args.id === id),
    books: () => books
  }
};
