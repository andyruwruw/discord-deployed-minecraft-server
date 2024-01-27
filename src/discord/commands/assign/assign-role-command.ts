// Packages
import {
  ApplicationCommandOptionData,
  ApplicationCommandSubCommandData,
  ApplicationCommandSubGroupData,
  CommandInteraction,
} from 'discord.js';

// Local Imports
import { Server } from '../../..';
import { SubCommand } from '../generic/sub-command';
import AssignRoleRoleParameter from './options/assign-role-role-parameter';
import AssignRoleTypeParameter from './options/assign-role-type-parameter';

// Types
import { RoleType } from '../../../types/tables';

/**
 * Retrieves information about a route.
 */
class AssignRoleCommand extends SubCommand {
  /**
   * The Command's key.
   */
  static key: string = 'role';

  /**
   * Executes the command.
   *
   * @param {CommandInteraction} interaction Interaction to execute the command on.
   */
  async execute(interaction: CommandInteraction): Promise<void> {
    let replied = false;

    try {
      const [
        role,
        type,
      ] = interaction.options.data[0].options || [];
  
      await interaction.reply({
        content: `☐ - Assigning \`${type.value}\` Role...`,
      });

      replied = true;
  
      await Server.Database.roles.delete({
        type: type.value,
      });
  
      await Server.Database.roles.insert({
        id: role.value as string,
        type: type.value as RoleType,
      });
  
      interaction.editReply({
        content: `☑ - Assigned \`${type.value}\` Role!`,
      });
    } catch (error) {
      const response = '☒ - Issue Assigning Role.';

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
    return 'Assigns a discord role.';
  }

  /**
   * Retrieves the Command's key.
   *
   * @returns {string} Key of the Command.
   */
  getKey(): string {
    return AssignRoleCommand.key;
  }

  /**
   * Retrieves a Command's options.
   *
   * @returns {Exclude<ApplicationCommandOptionData, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData>[]} Options of the Command.
   */
  getOptions(): Exclude<ApplicationCommandOptionData, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData>[] {
    return [
      AssignRoleRoleParameter.create(),
      AssignRoleTypeParameter.create(),
    ] as Exclude<ApplicationCommandOptionData, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData>[];
  }
}

export default new AssignRoleCommand();
