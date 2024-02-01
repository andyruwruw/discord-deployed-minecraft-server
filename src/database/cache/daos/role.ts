// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Role as RoleInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Role.
 */
export class RoleDataAccessObject
  extends DataAccessObject<RoleInterface>
  implements DataAccessObjectInterface<RoleInterface> {
}
