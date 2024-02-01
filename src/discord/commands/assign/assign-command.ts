// Packages
import {
  ApplicationCommandOptionData,
  CommandInteraction,
} from 'discord.js';

// Local Imports
import { ChatCommand } from '../generic/chat-command';
import AssignChannelCommand from './assign-channel-command';
import AssignRoleCommand from './assign-role-command';

/**
 * Commands for assigning discord.
 */
export class AssignCommand extends ChatCommand {
  /**
   * The Command's key.
   */
  static key: string = 'assign';

  /**
   * Executes the command.
   *
   * @param {CommandInteraction} interaction Interaction to execute the command on.
   */
  async execute(interaction: CommandInteraction): Promise<void> {
    if (interaction.options
      && interaction.options.data.length) {
      if (interaction.options.data[0].name === AssignChannelCommand.getKey()) {
        await AssignChannelCommand.execute(interaction);
      } else if (interaction.options.data[0].name === AssignRoleCommand.getKey()) {
        await AssignRoleCommand.execute(interaction);
      }
    }
  }

  /**
   * Retrieves the description of the command.
   *
   * @returns {string} Description of the command.
   */
  getDescription(): string {
    return 'Assign Discord roles or channels.';
  }

  /**
   * Retrieves the Command's key.
   *
   * @returns {string} Key of the Command.
   */
  getKey(): string {
    return AssignCommand.key;
  }

  /**
   * Retrieves a Command's options.
   *
   * @returns {ApplicationCommandOptionData[]} Options of the Command.
   */
  getOptions(): ApplicationCommandOptionData[] {
    return [
      AssignChannelCommand.create(),
      AssignRoleCommand.create(),
    ] as ApplicationCommandOptionData[];
  }
}
