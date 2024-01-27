// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Channel as ChannelInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Channel.
 */
export class ChannelDataAccessObject
  extends DataAccessObject<ChannelInterface>
  implements DataAccessObjectInterface<ChannelInterface> {
}
