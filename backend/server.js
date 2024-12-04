// server.js or index.js
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { readFileSync } = require("fs");
const path = require("path");
const resolvers = require("./resolvers.js");
const { gql } = require("graphql-tag");
const BookApi = require("./datasources.js");
// Read your schema from a .graphql file
const typeDefs = gql(
  readFileSync(path.join(path.resolve(), "backend/schema.graphql"), "utf8")
);

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          bookApi: new BookApi(),
        },
      };
    },
  });

  console.log(`
  🚀  Server is running!
  📭  Query at ${url}
  `);
}

startApolloServer();
