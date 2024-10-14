import { Request, Response, NextFunction } from 'express';
import SocialLink, {
  ISocialLink,
  SocialPlatform,
} from '../../models/SocialLink';

export const addSocialLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { platform, url } = req.body;
    const userId = (req as any).userId;

    const newLink: ISocialLink = new SocialLink({
      user: userId,
      platform,
      url,
    });

    await newLink.save();

    res.status(201).json({ success: true, data: newLink });
  } catch (error) {
    next(error);
  }
};

export const removeSocialLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { linkId } = req.params;
    const userId = (req as any).userId;

    const link = await SocialLink.findOneAndDelete({
      _id: linkId,
      user: userId,
    });

    if (!link) {
      res
        .status(404)
        .json({ success: false, message: 'Social link not found' });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: 'Social link removed successfully' });
  } catch (error) {
    next(error);
  }
};

export const getUserSocialLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).userId;

    const links = await SocialLink.find({ user: userId });

    res.status(200).json({ success: true, data: links });
  } catch (error) {
    next(error);
  }
};
