import {
  createUser,
  getUserByEmail,
  login,
  getUserById,
} from "../controllers/controller";
import { createTask } from "../models/taskModel";
import type { GraphQLContext } from "./context";

const resolver = {
  Query: {
    health: () => "Task Manager API is running",

    userByEmail: async (_: unknown, args: { email: string }) => {
      return getUserByEmail(args.email);
    },
    me: async (_: unknown, __: unknown, context: GraphQLContext) => {
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
      return createUser(args.name, args.email, args.password);
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

    createTask: async (
      _: unknown,
      args: {
        title: string;
        description?: string | null;
        status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
      },
      context: GraphQLContext,
    ) => {
      if (!context.userId) {
        throw new Error("Authentication required");
      }

      return createTask(
        context.userId,
        args.title,
        args.description ?? null,
        args.status ?? "TODO",
      );
    },
  },
};

export default resolver;
