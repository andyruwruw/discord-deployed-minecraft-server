// Packages
import {
  ApplicationCommandData,
  ApplicationCommandOptionData,
  CacheType,
  CommandInteractionOptionResolver,
  User,
} from 'discord.js';
import { ApplicationCommandTypes } from 'discord.js/typings/enums';

/**
 * Defines a command for discord.
 */
export class Command {
  commandStructure: ApplicationCommandData;

  /**
   * Instantiates a new command.
   *
   * @param {string} name Name of slash command
   * @param {string} description Description of command
   * @param {ApplicationCommandTypes} type Type of the command, either a chat command (/{name}), user command (bot context menu), message command (message context menu)
   * @param {ApplicationCommandOptionData[]} options Fields to take in and parse user input
   */
  constructor(
    name: string,
    description: string,
    type?: ApplicationCommandTypes,
    options?: ApplicationCommandOptionData[],
  ) {
    this.commandStructure = {
      name: name,
      description: description,
      type: type,
      options: options,
    };
  }

  /**
   * Generates a new response for the command.
   *
   * @param {User} user User object that has username, roles, etc.
   * @param {Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>} options Options object given from the interaction, used to parse user input
   */
  generateResponse(
    user: User, /* eslint-disable-line @typescript-eslint/no-unused-vars */
    options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>, /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ) {
  }
}
