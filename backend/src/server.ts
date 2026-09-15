import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDef from "./api/graphql/typeDef";
import resolver from "./api/graphql/resolver";
import getContext from "./api/graphql/context";
import prisma from "./utils/database/prisma";

const server = new ApolloServer({
  typeDefs: typeDef,
  resolvers: resolver,
});

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("✅ Database connected");

    const { url } = await startStandaloneServer(server, {
      listen: {
        port: 4000,
      },
      context: async ({ req }) => {
        return getContext(req);
      },
    });

    console.log(`🚀 Server running at ${url}`);
  } catch (error) {
    console.error("❌ Failed to start server:", error);

    await prisma.$disconnect();

    process.exit(1);
  }
};

startServer();