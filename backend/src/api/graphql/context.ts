import jwt from "jsonwebtoken";
import type { IncomingMessage } from "node:http";

export type GraphQLContext = {
  userId: number | null;
};

const getContext = (req: IncomingMessage): GraphQLContext => {
  const authorization = req.headers.authorization;

  if (!authorization || Array.isArray(authorization)) {
    return {
      userId: null,
    };
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return {
      userId: null,
    };
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!,
    ) as jwt.JwtPayload & {
      userId: number;
    };

    return {
      userId: payload.userId,
    };
  } catch {
    return {
      userId: null,
    };
  }
};

export default getContext;