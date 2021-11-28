// Packages
import mongoose from 'mongoose';

// Local Imports
import queries from './queries';
import { Database } from '../index';
import { DATABASE_URL } from '../../config';

/**
 * Database connection to MongoDB
 */
export class MongoDatabase extends Database {
  base = queries.base;

  guild = queries.guild;

  shop = queries.shop;

  userActivity = queries.userActivity;

  user = queries.user;

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    if (!DATABASE_URL) {
      throw new Error('Database URL not set in .env');
    }
  
    await mongoose.connect(DATABASE_URL as string);
  }
}