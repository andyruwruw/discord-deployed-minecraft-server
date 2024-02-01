// Local Imports
import { ChannelParameter } from '../../generic/options/channel-parameter';

class AssignChannelChannelParameter extends ChannelParameter {
  /**
   * Whether this parameter is required.
   *
   * @returns {boolean} Whether this parameter is required.
   */
  isRequired(): boolean {
    return true;
  }

  /**
   * Retrieves the description of the command.
   *
   * @returns {string} Description of the command.
   */
  getDescription(): string {
    return 'Channel to be assigned';
  }

  /**
   * Retrieves the Command's key.
   *
   * @returns {string} Key of the Command.
   */
  getKey(): string {
    return 'channel';
  }
}

export default new AssignChannelChannelParameter();
