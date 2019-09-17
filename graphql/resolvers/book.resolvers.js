let books = require("../../fixtures/books");
let authors = require("../../fixtures/authors");
const uuidv1 = require("uuid/v1");

module.exports = {
  Query: {
    book: (parent, args) => books.find(({ id }) => args.id === id), // return { id, name, genre, author_id }
    books: () => books
  },
  Mutation: {
    // parent, args, context
    addBook: (parent, { name, genre }) => {
      const book = { id: uuidv1(), name, genre };
      books.push(book);
      return book;
    },
    updateBook: (parent, { id, name, genre }) => {
      const book = books.find(book => book.id === id);
      book["name"] = name;
      book["genre"] = genre;
      return book;
    },
    deleteBook: (parent, { id }) => {
      const book = books.find(book => book.id === id);
      books = books.filter(({ id }) => book.id !== id);
      return book;
    }
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
