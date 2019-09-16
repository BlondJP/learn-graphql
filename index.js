const { ApolloServer } = require("apollo-server");
const url = "http://localhost:4000";

const { typeDefs, resolvers } = require("./graphql");
// console.log("resolvers", resolvers);
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
