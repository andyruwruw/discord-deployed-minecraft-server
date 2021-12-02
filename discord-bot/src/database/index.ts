// Local Imports
import { Database } from './database';
import { CacheDatabase } from './cache';
import { MongoDatabase } from './mongodb';
import {
  DATABASE_TYPE,
  DATABASE_TYPES,
} from '../config';

/**
 * Generates database based on environmental variables.
 *
 * @returns {Database} The database.
 */
 export const getDatabase = (): Database => {
  if (DATABASE_TYPE === DATABASE_TYPES.MONGO) {
    return new MongoDatabase();
  }
  return new CacheDatabase();
};
