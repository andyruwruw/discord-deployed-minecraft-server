/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import { DataAccessObject } from './dao';

// Types
import {
  Channel,
  Player,
  PlayerAchievement,
  Role,
  ServerSettings,
  Session
} from '../types/tables';
import { DataAccessObjectInterface } from '../types/database';

/**
 * Abstract Database interface, only implement inherited classes.
 */
export class Database {
  /**
   * Data access object for Channel.
   */
  channels: DataAccessObjectInterface<Channel> = new DataAccessObject<Channel>();

  /**
   * Data access object for Player.
   */
  players: DataAccessObjectInterface<Player> = new DataAccessObject<Player>();

  /**
   * Data access object for player achievements.
   */
  playerAchievements: DataAccessObjectInterface<PlayerAchievement> = new DataAccessObject<PlayerAchievement>();

  /**
   * Data access object for Role.
   */
  roles: DataAccessObjectInterface<Role> = new DataAccessObject<Role>();

  /**
   * Data access object for Role.
   */
  sessions: DataAccessObjectInterface<Session> = new DataAccessObject<Session>();

  /**
   * Data access object for server settings.
   */
  settings: DataAccessObjectInterface<ServerSettings> = new DataAccessObject<ServerSettings>();

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
