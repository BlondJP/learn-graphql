const books = require("../../fixtures/books");
const authors = require("../../fixtures/authors");

module.exports = {
  Query: {
    book: (parent, args) => books.find(({ id }) => args.id === id), // return { id, name, genre, author_id }
    books: () => books
  },
  Book: {
    name: ({ name }, args) => name,
    genre: ({ genre }, args) => genre,
    author: ({ author_id }, args) => {
      const author = authors.find(({ id }) => id === author_id);
      console.log("author", author);
      return author;
    }
  }
};
