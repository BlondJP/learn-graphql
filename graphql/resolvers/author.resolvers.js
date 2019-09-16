const authors = require("../../fixtures/authors");

module.exports = {
  Query: {
    author: (parent, args) => authors.find(({ id }) => args.id === id),
    authors: () => authors
  }
};
