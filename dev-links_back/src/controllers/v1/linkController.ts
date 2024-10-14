import { Request, Response, NextFunction } from 'express';
import Link, { ILink, Platform } from '../../models/Link';
import mongoose from 'mongoose';

export const addLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { links } = req.body;
    const userId = (req as any).user._id;
    console.log('userId', userId);
    if (!Array.isArray(links)) {
      res
        .status(400)
        .json({ success: false, message: 'Links must be an array' });
      return;
    }

    const updatedLinks: ILink[] = await Promise.all(
      links.map(async (link) => {
        if (link._id) {
          // If id is provided, update the existing link
          const updatedLink = await Link.findOneAndUpdate(
            { _id: link._id, user: userId },
            { platform: link.platform, url: link.url },
            { new: true, runValidators: true }
          );
          if (!updatedLink) {
            throw new Error(
              `Link with id ${link.id} not found or does not belong to the user`
            );
          }
          return updatedLink;
        } else {
          // If no id is provided, create a new link
          console.log(link);
          const newLink = new Link({
            user: userId,
            platform: link.platform,
            url: link.url,
          });
          await newLink.save();
          return newLink;
        }
      })
    );

    res.status(201).json({ success: true, data: updatedLinks });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ success: false, message: error.message });
    } else if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
    } else {
      next(error);
    }
  }
};

export const removeLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { linkId } = req.params;
    const userId = (req as any).user._id;

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
    const userId = (req as any).user._id;
    const links = await Link.find({ user: userId });

    res.status(200).json({ success: true, data: links });
  } catch (error) {
    next(error);
  }
};
