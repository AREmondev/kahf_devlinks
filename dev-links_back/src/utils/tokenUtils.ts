import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtRefreshSecret, { expiresIn: '7d' });
};

export const verifyRefreshToken = (token: string): string | object => {
  return jwt.verify(token, config.jwtRefreshSecret);
};
