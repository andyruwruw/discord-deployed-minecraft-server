// Local Imports
import { StringParameter } from '../../generic/options/string-parameter';

class WhitelistUsernameParameter extends StringParameter {
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
    return 'Your minecraft username.';
  }

  /**
   * Retrieves the Command's key.
   *
   * @returns {string} Key of the Command.
   */
  getKey(): string {
    return 'username';
  }
}

export default new WhitelistUsernameParameter();
