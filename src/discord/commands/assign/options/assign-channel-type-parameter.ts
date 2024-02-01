// Packages
import { ApplicationCommandOptionChoiceData } from 'discord.js';

// Local Imports
import { StringParameter } from '../../generic/options/string-parameter';

class AssignChannelTypeParameter extends StringParameter {
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
    return 'Type of channel.';
  }

  /**
   * Retrieves the Command's key.
   *
   * @returns {string} Key of the Command.
   */
  getKey(): string {
    return 'type';
  }

  /**
   * Retrieves the Command's choices.
   *
   * @returns {number} Choices for command.
   */
  getChoices(): ApplicationCommandOptionChoiceData<string>[] {
    return [
      {
        name: 'Broadcast Channel',
        value: 'broadcast',
      },
      {
        name: 'Console Channel',
        value: 'console',
      },
      {
        name: 'General',
        value: 'general',
      },
      {
        name: 'Bulletin Board',
        value: 'bulletin-board',
      },
    ];
  }
}

export default new AssignChannelTypeParameter();
