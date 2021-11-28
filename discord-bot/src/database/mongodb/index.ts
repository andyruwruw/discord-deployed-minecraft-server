import mongoose from 'mongoose';

// Local Imports
import { Database } from '../index';
import { DATABASE_URL } from '../../config';

export class MongoDatabase extends Database
{
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