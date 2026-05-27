import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN as string;

  return jwt.sign(payload, secret, {
    expiresIn: expiresIn as any,
  });
};
