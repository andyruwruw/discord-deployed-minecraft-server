// Local Imports
import queries from './queries';
import { Database } from '../database';

/**
 * Non-persistant cache database for testing.
 */
export class CacheDatabase extends Database {
  /**
   * Instantiates CacheDatabase with correct queries.
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
    console.log('Connected to cache database for testing purposes, change to MongoDB for live.');
  }
}
