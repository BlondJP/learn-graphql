const author = require("./author.resolvers");
const book = require("./book.resolvers");

const rootValue = {
  Query: {
    ...author.Query,
    ...book.Query
  }
};

module.exports = rootValue;
