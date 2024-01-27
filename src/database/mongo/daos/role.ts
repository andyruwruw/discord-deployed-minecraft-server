// Packages
import { Model } from 'mongoose';

// Local Imports
import { RoleModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Role as RoleInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Roles.
 */
export class RoleDataAccessObject
  extends DataAccessObject<RoleInterface>
  implements DataAccessObjectInterface<RoleInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return RoleModel;
  }
}
