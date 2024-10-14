import mongoose from 'mongoose';
import config from './config';
import logger from '../utils/logger';

/**
 * Connects to MongoDB using the configuration from config file.
 * Logs success or error messages.
 */
const connectDB = async (): Promise<void> => {
  try {
    const { username, password, cluster, database } = config.mongodb;
    const mongoURI = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;
    await mongoose.connect(mongoURI);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
