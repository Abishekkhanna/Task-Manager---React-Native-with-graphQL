import { createUser, getUserByEmail, login, getUserById } from "../controllers/controller";
import type { GraphQLContext } from "./context";

const resolver = {
  Query: {
    health: () => "Task Manager API is running",

    userByEmail: async (
      _: unknown,
      args: { email: string },
    ) => {
      return getUserByEmail(args.email);
    },
    me: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext,
    ) => {
      if (!context.userId) {
        throw new Error("Authentication required");
      }

      return getUserById(context.userId);
    },
  },

  Mutation: {
    createUser: async (
      _: unknown,
      args: {
        name: string;
        email: string;
        password: string;
      },
    ) => {
      return createUser(
        args.name,
        args.email,
        args.password,
      );
    },

    login: async (
      _: unknown,
      args: {
        email: string;
        password: string;
      },
    ) => {
      return login({
        email: args.email,
        password: args.password,
      });
    },
  },
};

export default resolver;