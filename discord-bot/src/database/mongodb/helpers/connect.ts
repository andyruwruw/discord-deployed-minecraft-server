// Packages
import mongoose from 'mongoose';

const {
  MONGODB_URL,
} = process.env;

/**
 * Connects to MongoDB database.
 */
export const connect = async (): Promise<void> => {
  if (!MONGODB_URL) {
    throw new Error('Mongo Database URL not set in .env');
  }

  await mongoose.connect(MONGODB_URL as string);
}