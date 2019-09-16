const resolvers = require("./resolvers");
const { gql } = require("apollo-server-express");
const { readFileSync } = require("fs");
const path = require("path");
const schemaPath = path.join(__dirname, "/schema.gql");
const schemaFile = readFileSync(schemaPath, "utf8");
const typeDefs = gql(schemaFile);

module.exports = {
  typeDefs,
  resolvers
};
