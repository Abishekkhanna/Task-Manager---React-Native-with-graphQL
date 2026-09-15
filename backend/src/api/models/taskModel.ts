import prisma from "../../utils/database/prisma";

import type { TaskStatus } from "../types/typeDeclaration";

const createTask = async (
  userId: number,
  title: string,
  description: string | null,
  status: TaskStatus,
) => {
  return prisma.task.create({
    data: {
      userId,
      title,
      description,
      status,
    },
  });
};

export {
  createTask,
};