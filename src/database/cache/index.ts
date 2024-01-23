// Local Imports
import {
  PlayerDataAccessObject,
} from './daos';
import { Database } from '../database';

/**
 * Memory database..
 */
export class CacheDatabase extends Database {
  /**
   * Instantiates CacheDatabase with correct queries.
   */
  constructor() {
    super();

    this.players = new PlayerDataAccessObject();
  }

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    return;
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    return true;
  }
}
