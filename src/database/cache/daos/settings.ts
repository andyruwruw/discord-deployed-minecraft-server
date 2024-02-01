// Local Imports
import { DataAccessObject } from './dao';

// Types
import { ServerSettings as SettingsInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Settings.
 */
export class SettingsDataAccessObject
  extends DataAccessObject<SettingsInterface>
  implements DataAccessObjectInterface<SettingsInterface> {
}
