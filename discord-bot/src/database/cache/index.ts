// Local Imports
import queries from './queries';
import { Database } from '../index';

/**
 * Non-persistant cache database for testing.
 */
export class CacheDatabase extends Database {
  base = queries.base;

  guild = queries.guild;

  shop = queries.shop;

  userActivity = queries.userActivity;

  user = queries.user;
}
