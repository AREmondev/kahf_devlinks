import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

interface DecodedToken {
  userId: string;
}

/**
 * Authentication middleware
 * Verifies the JWT token in the Authorization header
 */
export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken;
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
