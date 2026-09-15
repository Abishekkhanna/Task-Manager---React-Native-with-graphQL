import prisma from "../../utils/database/prisma";

const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};

const createRefreshToken = async (
  userId: number,
  token: string,
  expiresAt: Date,
) => {
  return prisma.refreshToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
};

export {
  findUserByEmail,
  findUserById,
  createUser,
  createRefreshToken,
};