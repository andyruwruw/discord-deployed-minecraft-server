// Packages
import { ApplicationCommandOptionChoiceData } from 'discord.js';

// Local Imports
import { StringParameter } from '../../generic/options/string-parameter';

class AssignRoleTypeParameter extends StringParameter {
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
    return 'Type of role.';
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
        name: 'OP Role',
        value: 'op',
      },
      {
        name: 'Online Role',
        value: 'online',
      },
      {
        name: 'Dirt Role',
        value: 'dirt',
      },
      {
        name: 'Diamond Role',
        value: 'diamond',
      },
      {
        name: 'Wood Role',
        value: 'wood',
      },
      {
        name: 'Stone Role',
        value: 'stone',
      },
      {
        name: 'Iron Role',
        value: 'iron',
      },
      {
        name: 'Gold Role',
        value: 'gold',
      },
      {
        name: 'Netherite Role',
        value: 'netherite',
      },
      {
        name: 'Most Playtime Role',
        value: 'most-playtime',
      },
      {
        name: 'Most Achievements Role',
        value: 'most-achievements',
      },
      {
        name: 'All Achievements Role',
        value: 'all-achievements',
      },
      {
        name: 'Most Deaths Role',
        value: 'most-deaths',
      },
    ];
  }
}

export default new AssignRoleTypeParameter();
