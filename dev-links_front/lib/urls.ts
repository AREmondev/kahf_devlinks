// NEXT_PUBLIC_MEDIA_URL
const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL;

export const getMediaUrl = (path: string) => {
  return `${mediaUrl}${path}`;
};
