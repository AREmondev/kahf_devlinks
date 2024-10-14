import dotenv from 'dotenv';

dotenv.config();

interface ConfigTypes {
  port: number;
  mongodb: {
    username: string;
    password: string;
    cluster: string;
    database: string;
  };
  jwtSecret: string;
  jwtRefreshSecret: string;
  nodeEnv: string;
  gcsProjectId: string;
  gcsKeyFilename: string;
  gcsBucketName: string;
}

const config: ConfigTypes = {
  port: parseInt(process.env.PORT || '8000', 10),
  mongodb: {
    username: process.env.MONGODB_USERNAME || '',
    password: process.env.MONGODB_PASSWORD || '',
    cluster: process.env.MONGODB_CLUSTER || '',
    database: process.env.MONGODB_DATABASE || '',
  },
  jwtSecret: process.env.JWT_SECRET || '',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',
  nodeEnv: process.env.NODE_ENV || '',
  gcsProjectId: process.env.GCS_PROJECT_ID || '',
  gcsKeyFilename: process.env.GCS_KEY_FILENAME || '',
  gcsBucketName: process.env.GCS_BUCKET_NAME || '',
};

export default config;
