const authors = require("../../fixtures/authors");
const books = require("../../fixtures/books");

module.exports = {
  Query: {
    author: (parent, args) => authors.find(({ id }) => args.id === id),
    authors: () => authors
  },
  Author: {
    name: ({ name }, args) => name,
    age: ({ age }, args) => age,
    books: (parent, args) => books.filter(book => parent.id === book.author_id)
  }
};
