import { Request, Response, NextFunction } from 'express';
import Link, { ILink, Platform } from '../../models/Link';

export const addLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { platform, url } = req.body;
    const userId = (req as any).userId;

    const newLink: ILink = new Link({
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

export const removeLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { linkId } = req.params;
    const userId = (req as any).userId;

    const link = await Link.findOneAndDelete({
      _id: linkId,
      user: userId,
    });

    if (!link) {
      res.status(404).json({ success: false, message: 'Link not found' });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: 'Link removed successfully' });
  } catch (error) {
    next(error);
  }
};

export const getUserLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).userId;

    const links = await Link.find({ user: userId });

    res.status(200).json({ success: true, data: links });
  } catch (error) {
    next(error);
  }
};
