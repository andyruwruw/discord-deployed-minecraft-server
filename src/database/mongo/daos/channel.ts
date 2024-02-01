// Packages
import { Model } from 'mongoose';

// Local Imports
import { ChannelModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Channel as ChannelInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Channels.
 */
export class ChannelDataAccessObject
  extends DataAccessObject<ChannelInterface>
  implements DataAccessObjectInterface<ChannelInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return ChannelModel;
  }
}
