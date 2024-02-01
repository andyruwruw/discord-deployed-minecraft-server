// Local Imports
import { DataAccessObject } from './dao';

// Types
import { PlayerAchievement as PlayerAchievementInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for PlayerAchievement.
 */
export class PlayerAchievementDataAccessObject
  extends DataAccessObject<PlayerAchievementInterface>
  implements DataAccessObjectInterface<PlayerAchievementInterface> {
}
