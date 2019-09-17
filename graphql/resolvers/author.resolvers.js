let authors = require("../../fixtures/authors");
let books = require("../../fixtures/books");
const uuidv1 = require("uuid/v1");

module.exports = {
  Query: {
    author: (parent, args) => authors.find(({ id }) => args.id === id),
    authors: () => authors
  },
  Mutation: {
    // parent, args, context
    addAuthor: (parent, { name, age }) => {
      const author = { id: uuidv1(), name, age };
      authors.push(author);
      return author;
    },
    updateAuthor: (parent, { id, name, age }) => {
      const author = authors.find(author => author.id === id);
      author["name"] = name;
      author["age"] = age;
      return author;
    },
    deleteAuthor: (parent, { id }) => {
      const author = authors.find(author => author.id === id);
      authors = authors.filter(author => author.id !== id);
      return author;
    }
  },
  Author: {
    name: ({ name }, args) => name,
    age: ({ age }, args) => age,
    books: (parent, args) => books.filter(book => parent.id === book.author_id)
  }
};
