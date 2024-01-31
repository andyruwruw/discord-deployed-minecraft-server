// Local Imports
import {
  PlayerDataAccessObject,
  ChannelDataAccessObject,
  RoleDataAccessObject,
  PlayerAchievementDataAccessObject,
  SettingsDataAccessObject,
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

    this.channels = new ChannelDataAccessObject();
    this.players = new PlayerDataAccessObject();
    this.playerAchievements = new PlayerAchievementDataAccessObject();
    this.roles = new RoleDataAccessObject();
    this.settings = new SettingsDataAccessObject();
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
