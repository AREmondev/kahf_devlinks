import { Schema, model, Document } from 'mongoose';

export enum Platform {
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  INSTAGRAM = 'instagram',
  GITHUB = 'github',
  OTHER = 'other',
}

export interface ILink extends Document {
  user: Schema.Types.ObjectId;
  platform: Platform;
  url: string;
}

const LinkSchema: Schema<ILink> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    platform: {
      type: String,
      enum: Object.values(Platform),
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

export default model<ILink>('Link', LinkSchema);
