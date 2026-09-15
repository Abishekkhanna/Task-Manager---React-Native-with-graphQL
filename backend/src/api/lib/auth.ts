import jwt, { type SignOptions } from "jsonwebtoken";

import type { AuthTokens } from "../types/typeDeclaration";

const generateTokens = (userId: number): AuthTokens => {
  const accessTokenOptions: SignOptions = {
    expiresIn: "15m",
  };

  const refreshTokenOptions: SignOptions = {
    expiresIn: "7d",
  };

  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET!,
    accessTokenOptions,
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET!,
    refreshTokenOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export {
  generateTokens,
};