import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDef from "./api/graphql/typeDef";
import resolver from "./api/graphql/resolver";

const server = new ApolloServer({
  typeDefs: typeDef,
  resolvers: resolver,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
  });

  console.log(`🚀 Server running at ${url}`);
};

startServer();