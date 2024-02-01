// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Player as PlayerInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Player.
 */
export class PlayerDataAccessObject
  extends DataAccessObject<PlayerInterface>
  implements DataAccessObjectInterface<PlayerInterface> {
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
