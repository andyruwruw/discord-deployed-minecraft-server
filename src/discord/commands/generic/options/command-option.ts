/**
 * The Command Option class is abstract and defines methods
 * used by all commands options, namely converting a concrete
 * implementation into a JSON object that Discord
 * recognizes as a command option.
 * 
 * Use of this class is limited to concrete commands options
 * inheriting from this class.
 */

// Packages
import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
} from 'discord.js';

// Local Imports
import { UsedAbstractCommandError } from '../../../../errors/used-abstract-command-error';

/**
 * Abstract Command Option class, only implement inherited classes.
 */
export class CommandOption {
  /**
   * Converts the command into ApplicationCommandOptionData for uploading to Discord.
   *
   * @returns {ApplicationCommandOptionData} Discord accepted object for command.
   */
  create(): ApplicationCommandOptionData {
    throw new UsedAbstractCommandError();
  }

  /**
   * Retrieves the description of the command.
   *
   * @returns {string} Description of the command.
   */
  getDescription(): string {
    throw new UsedAbstractCommandError();
  }

  /**
   * Retrieves the Command's key.
   *
   * @returns {string} Key of the Command.
   */
  getKey(): string {
    throw new UsedAbstractCommandError();
  }

  /**
   * Retrieves a Command's options.
   *
   * @returns {ApplicationCommandOptionData[]} Options of the Command.
   */
  getOptions(): ApplicationCommandOptionData[] {
    return [] as ApplicationCommandOptionData[];
  }

  /**
   * Retrieves the Command's type.
   *
   * @returns {number} Type of the Command.
   */
  getType(): ApplicationCommandOptionType {
    throw new UsedAbstractCommandError();
  }
}