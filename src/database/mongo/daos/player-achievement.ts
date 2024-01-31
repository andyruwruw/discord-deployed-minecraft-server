// Packages
import { Model } from 'mongoose';

// Local Imports
import { PlayerAchievementModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { PlayerAchievement as PlayerAchievementInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for PlayerAchievements.
 */
export class PlayerAchievementDataAccessObject
  extends DataAccessObject<PlayerAchievementInterface>
  implements DataAccessObjectInterface<PlayerAchievementInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return PlayerAchievementModel;
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
