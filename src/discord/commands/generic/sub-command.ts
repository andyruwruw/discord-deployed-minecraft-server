/**
 * The Sub-command class is abstract and defines methods
 * used by all sub-commands, namely converting a concrete
 * implementation into a JSON object that Discord
 * recognizes as a command.
 * 
 * Use of this class is limited to concrete sub-comamnds
 * inheriting from this class.
 */

// Packages
import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
  ApplicationCommandSubCommandData,
  ApplicationCommandSubGroupData,
  CommandInteraction,
} from 'discord.js';

// Local Imports
import { APPLICATION_COMMAND_OPTION_TYPES } from '../../../config/discord';

/**
 * Abstract SubCommand class, only implement inherited classes.
 */
export class SubCommand {
  /**
   * Executes the sub-command.
   *
   * @param {CommandInteraction} interaction Interaction to execute the command on.
   */
  async execute(interaction: CommandInteraction): Promise<void> {
    throw new Error('Used abstract command!');
  }

  /**
   * Converts the command into ApplicationCommandOptionData for uploading to Discord.
   *
   * @returns {ApplicationCommandSubCommandData} Discord accepted object for command.
   */
  create(): ApplicationCommandSubCommandData {
    return {
      type: this.getType(),
      name: this.getKey(),
      description: this.getDescription(),
      options: this.getOptions(),
    };
  }

  /**
   * Retrieves the description of the command.
   *
   * @returns {string} Description of the command.
   */
  getDescription(): string {
    throw new Error('Used abstract command!');
  }

  /**
   * Retrieves the Command's key.
   *
   * @returns {string} Key of the Command.
   */
  getKey(): string {
    throw new Error('Used abstract command!');
  }

  /**
   * Retrieves a Command's options.
   *
   * @returns {Exclude<ApplicationCommandOptionData, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData>[]} Options of the Command.
   */
  getOptions(): Exclude<ApplicationCommandOptionData, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData>[] {
    return [] as Exclude<ApplicationCommandOptionData, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData>[];
  }

  /**
   * Retrieves the Command's type.
   *
   * @returns {ApplicationCommandOptionType.Subcommand} Type of the Command.
   */
  getType(): ApplicationCommandOptionType.Subcommand {
    return APPLICATION_COMMAND_OPTION_TYPES.SUB_COMMAND as ApplicationCommandOptionType.Subcommand;
  }
}
