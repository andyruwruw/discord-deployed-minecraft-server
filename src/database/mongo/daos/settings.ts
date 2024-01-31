// Packages
import { Model } from 'mongoose';

// Local Imports
import { SettingsModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { ServerSettings as SettingsInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Settingss.
 */
export class SettingsDataAccessObject
  extends DataAccessObject<SettingsInterface>
  implements DataAccessObjectInterface<SettingsInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return SettingsModel;
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
