// Packages
import { Model } from 'mongoose';

// Local Imports
import { PlayerModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Player as PlayerInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Players.
 */
export class PlayerDataAccessObject
  extends DataAccessObject<PlayerInterface>
  implements DataAccessObjectInterface<PlayerInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return PlayerModel;
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {
      hours: -1,
    };
  }
}
