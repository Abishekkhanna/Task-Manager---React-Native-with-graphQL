export type LoginInput = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "COMPLETED";