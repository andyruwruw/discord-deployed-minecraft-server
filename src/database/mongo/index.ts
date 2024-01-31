// Packages
import mongoose, {
  connect,
  connection,
} from 'mongoose';

// Local Imports
import {
  PlayerDataAccessObject,
  ChannelDataAccessObject,
  RoleDataAccessObject,
  PlayerAchievementDataAccessObject,
  SettingsDataAccessObject,
} from './daos';
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../../config/messages';
import { DatabaseUrlMissingError } from '../../errors/database-url-missing';
import { Environment } from '../../helpers/environment';
import { Database } from '../database';
import { Monitor } from '../../helpers/monitor';

mongoose.set('strictQuery', false);

/**
 * Database connection to MongoDB.
 */
export class MongoDatabase extends Database {
  /**
   * Instantiates MongoDatabase with correct queries.
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
    if (!Environment.getDatabaseUrl()) {
      throw new DatabaseUrlMissingError();
    }

    const authorizedUrl = Environment.getDatabaseUrl()
      .replace(
        '<user>',
        Environment.getDatabaseUser(),
      )
      .replace(
        '<password>',
        Environment.getDatabasePassword(),
      );

    await connect(authorizedUrl);

    Monitor.log(
      MongoDatabase,
      MESSAGE_DATABASE_CONNECTION_SUCCESS,
      Monitor.Layer.UPDATE,
    );
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    return (connection && 'readyState' in connection) ? connection.readyState === 1 : false;
  }
}
