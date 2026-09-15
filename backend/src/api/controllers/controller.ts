import bcrypt from "bcrypt";
import {
  createRefreshToken,
  findUserByEmail,
  findUserById,
  createUser as createUserModel,
} from "../models/model";
import { generateTokens } from "../lib/auth";
import type { AuthTokens, LoginInput } from "../types/typeDeclaration";

const getUserByEmail = async (email: string) => {
  return findUserByEmail(email);
};

const getUserById = async (id: number) => {
  return findUserById(id);
};

const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  return createUserModel(name, email, hashedPassword);
};

const login = async (
  input: LoginInput,
): Promise<{
  user: Awaited<ReturnType<typeof findUserByEmail>>;
  accessToken: string;
  refreshToken: string;
}> => {
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(
    input.password,
    user.password,
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  const tokens: AuthTokens = generateTokens(user.id);

  const hashedRefreshToken = await bcrypt.hash(
    tokens.refreshToken,
    12,
  );

  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + 7);

  await createRefreshToken(
    user.id,
    hashedRefreshToken,
    expiresAt,
  );

  return {
    user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

export {
  getUserByEmail,
  getUserById,
  createUser,
  login,
};