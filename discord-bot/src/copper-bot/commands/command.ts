// Packages
import { ApplicationCommandData, ApplicationCommandOptionData, CacheType, CommandInteractionOptionResolver, User } from 'discord.js';
import { ApplicationCommandTypes } from 'discord.js/typings/enums';

export class Command {
  commandStructure: ApplicationCommandData;

  /**
   * 
   * @param name Name of slash command
   * @param description Description of command
   * @param type Type of the command, either a chat command (/{name}), user command (bot context menu), message command (message context menu)
   * @param options Fields to take in and parse user input
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
    }
  }

  /**
   * @param user User object that has username, roles, etc.
   * @param options Options object given from the interaction, used to parse user input
   */
  generateResponse(
    user: User,
    options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ) { }
}
