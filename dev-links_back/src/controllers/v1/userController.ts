import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../models/User';
import User from '../../models/User';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import crypto from 'crypto';
import Link from '../../models/Link';

const storage = new Storage({
  keyFilename: path.join(__dirname, '../../../google-cloud-key.json'),
  projectId: 'kahf-438516',
});

const bucket = storage.bucket('kahf');

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (
  req: Request & { user?: IUser },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const user = await User.findById(req.user._id).select('+shareToken');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const userProfile = {
      ...user.toObject(),
      shareToken: user.shareToken ? `${user.shareToken}` : null,
    };

    res.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request & { user?: IUser },
  res: Response
) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.email) user.email = req.body.email;

    // Handle profile image upload
    if (req.file && req.file.path) {
      user.profileImage = req.file.path;
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

export const generateShareLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Generate a unique token
    const token = crypto.randomBytes(16).toString('hex');

    // Save the token to the user
    user.shareToken = token;
    await user.save();

    res.status(200).json({ success: true, shareLink: `${token}` });
  } catch (error) {
    next(error);
  }
};

export const getSharedProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ shareToken: token }).select(
      '-password -refreshToken'
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Shared profile not found' });
    }

    const links = await Link.find({ user: user._id });

    res.status(200).json({
      success: true,
      data: {
        profileImage: user.profileImage,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        links: links,
      },
    });
  } catch (error) {
    next(error);
  }
};
