// Packages
import mongoose from 'mongoose';

// Local Imports
import queries from './queries';
import { Database } from '../database';
import { DATABASE_URL } from '../../config';


/**
 * Database connection to MongoDB
 */
export class MongoDatabase extends Database {
  /**
   * Instantiates MongoDatabase with correct queries.
   */
  constructor() {
    super();

    this.base = queries.base;
    this.guild = queries.guild;
    this.shop = queries.shop;
    this.userActivities = queries.userActivity;
    this.user = queries.user;
  }

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    if (!DATABASE_URL) {
      throw new Error('Database URL not set in .env');
    }
  
    await mongoose.connect(DATABASE_URL as string);
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {Promise<boolean>} Whether the class is connected to the database.
   */
  async isConnected(): Promise<boolean> {
    return mongoose.connection.readyState === 1;
  }
}