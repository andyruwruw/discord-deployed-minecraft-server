// Packages
import {
  ApplicationCommandOptionData,
  ApplicationCommandSubCommandData,
  ApplicationCommandSubGroupData,
  Collection,
  CommandInteraction,
  Role,
} from 'discord.js';

// Local Imports
import { Server } from '../../../';
import { SubCommand } from '../generic/sub-command';
import { DiscordReferences } from '../../discord-references';
import { DISCORD_ROLE } from '../../../config/discord';
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

      const roles = await interaction.member?.roles.valueOf();
      const op = await DiscordReferences.getRole(DISCORD_ROLE.OP);

      if (!roles
        || !op
        || !((roles as Collection<string, Role>).has(op.id))) {
        await interaction.editReply({
          content: `☒ - You do not have permission to change the \`${type.value}\` Channel.`,
        });
        return;
      }

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

      try {
        if (replied) {
          interaction.editReply({
            content: response,
          });
        } else {
          interaction.reply({
            content: response,
          });
        }
      } catch (error) {
        console.log(error);
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
