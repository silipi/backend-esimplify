import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const rawToken =
    (req.headers['authorization'] as string) ||
    (req.headers['Authorization'] as string);

  const cookie = req.cookies.token;

  if (!rawToken && !cookie) {
    return res.status(401).json({
      message: 'No token provided in cookies or Authorization header',
    });
  }

  const token = rawToken ? rawToken.slice(7) : cookie;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as any;
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
  return next();
};

export default authentication;
