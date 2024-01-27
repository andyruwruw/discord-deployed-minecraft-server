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
} from './daos';
import { Database } from '../database';
import { Monitor } from '../../helpers/monitor';
import { Environment } from '../../helpers/environment';

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

    this.players = new PlayerDataAccessObject();
    this.channels = new ChannelDataAccessObject();
    this.roles = new RoleDataAccessObject();
  }

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    if (!Environment.getDatabaseUrl()) {
      throw new Error('Missing database URL!');
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
      'Database connection successfully made.',
      Monitor.Layer.UPDATE,
    );
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    return connection && 'readyState' in connection ? connection.readyState === 1 : false;
  }
}
