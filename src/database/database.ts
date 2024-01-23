/* eslint @typescript-eslint/no-unused-vars: "off" */
// Types
import {
  Player
} from '../types/tables';
import { DataAccessObjectInterface } from '../types/database';
import { DataAccessObject } from './dao';

/**
 * Abstract Database interface, only implement inherited classes.
 */
export class Database {
  /**
   * Data access object for Player.
   */
  players: DataAccessObjectInterface<Player> = new DataAccessObject<Player>();

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    throw new Error('Used abstract database!');
  }

  /**
   * Whether or not the database is connected.
   *
   * @returns {boolean} Whether or not the database is connected.
   */
  isConnected(): boolean {
    return false;
  }

  /**
   * Get's a data access object.
   * 
   * @param {string} name Name of data access object.
   * @returns {DataAccessObjectInterface} Data access object.
   */
  getDao(name: string): DataAccessObject<any> {
    switch (name) {
      default:
        return this.players;
    }
  }
}
