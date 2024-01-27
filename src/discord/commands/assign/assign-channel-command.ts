// Packages
import {
  ApplicationCommandOptionData,
  ApplicationCommandSubCommandData,
  ApplicationCommandSubGroupData,
  CommandInteraction,
} from 'discord.js';

// Local Imports
import { Server } from '../../../';
import { SubCommand } from '../generic/sub-command';
import AssignChannelChannelParameter from './options/assign-channel-channel-parameter';
import AssignChannelTypeParameter from './options/assign-channel-type-parameter';

// Types
import { ChannelType } from '../../../types/tables';

/**
 * Retrieves information about a route.
 */
class AssignChannelCommand extends SubCommand {
  /**
   * The Command's key.
   */
  static key: string = 'channel';

  /**
   * Executes the command.
   *
   * @param {CommandInteraction} interaction Interaction to execute the command on.
   */
  async execute(interaction: CommandInteraction): Promise<void> {
    let replied = false;

    try {
      const [
        channel,
        type,
      ] = interaction.options.data[0].options || [];
  
      await interaction.reply({
        content: `☐ - Assigning \`${type.value}\` Channel...`,
      });

      replied = true;
  
      await Server.Database.channels.delete({
        type: type.value,
      });
  
      await Server.Database.channels.insert({
        id: channel.value as string,
        type: type.value as ChannelType,
      });
  
      interaction.editReply({
        content: `☑ - Assigned \`${type.value}\` Channel!`,
      });
    } catch (error) {
      const response = '☒ - Issue Assigning Channel.';

      if (replied) {
        interaction.editReply({
          content: response,
        });
      } else {
        interaction.reply({
          content: response,
        });
      }
    }
  }

  /**
   * Retrieves the description of the command.
   *
   * @returns {string} Description of the command.
   */
  getDescription(): string {
    return 'Assigns a discord channel.';
  }

  /**
   * Retrieves the Command's key.
   *
   * @returns {string} Key of the Command.
   */
  getKey(): string {
    return AssignChannelCommand.key;
  }

  /**
   * Retrieves a Command's options.
   *
   * @returns {Exclude<ApplicationCommandOptionData, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData>[]} Options of the Command.
   */
  getOptions(): Exclude<ApplicationCommandOptionData, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData>[] {
    return [
      AssignChannelChannelParameter.create(),
      AssignChannelTypeParameter.create(),
    ] as Exclude<ApplicationCommandOptionData, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData>[];
  }
}

export default new AssignChannelCommand();
