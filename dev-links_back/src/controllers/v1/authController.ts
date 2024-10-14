import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../../models/User';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../utils/tokenUtils';

// Helper function to generate JWT
const generateToken = (user: IUser): string => {
  return jwt.sign({ id: user._id, email: user.email }, config?.jwtSecret, {
    expiresIn: '1h',
  });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }

    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        refreshToken: user.refreshToken,
      },
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log(isMatch);
    if (!isMatch) {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    // Generate token
    const accessToken = generateAccessToken(user._id as string);
    const refreshToken = generateRefreshToken(user._id as string);

    user.refreshToken = refreshToken;
    await user.save();
    res.json({
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = generateAccessToken(user._id as string);
    const newRefreshToken = generateRefreshToken(user._id as string);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = undefined;
      await user.save();
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
