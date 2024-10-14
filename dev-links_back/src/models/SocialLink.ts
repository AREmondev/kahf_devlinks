import { Schema, model, Document } from 'mongoose';

export enum SocialPlatform {
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  INSTAGRAM = 'instagram',
  GITHUB = 'github',
  OTHER = 'other',
}

export interface ISocialLink extends Document {
  user: Schema.Types.ObjectId;
  platform: SocialPlatform;
  url: string;
}

const SocialLinkSchema: Schema<ISocialLink> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    platform: {
      type: String,
      enum: Object.values(SocialPlatform),
      required: true,
    },
    url: {
      type: String,
      required: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please enter a valid URL',
      ],
    },
  },
  { timestamps: true }
);

export default model<ISocialLink>('SocialLink', SocialLinkSchema);
