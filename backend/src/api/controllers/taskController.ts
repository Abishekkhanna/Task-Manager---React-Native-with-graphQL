import { createTask as createTaskModel } from "../models/taskModel";
import type { TaskStatus } from "../types/typeDeclaration";

const createTask = async (
  userId: number,
  title: string,
  description: string | null,
  status: TaskStatus,
) => {
  return createTaskModel(userId, title, description, status);
};

export { createTask };
