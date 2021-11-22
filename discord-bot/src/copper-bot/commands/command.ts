// Packages
import { ApplicationCommandType } from 'discord-api-types';
import { Message, ApplicationCommandData, ApplicationCommandOptionData } from 'discord.js';
import { ApplicationCommandTypes } from 'discord.js/typings/enums';

// Local Imports
import { getMessageComponents } from '../../helpers';

/**
 * Defines a command
 */
export class Command {
  commandStructure: ApplicationCommandData;
  name: string;
  description: string;

  /**
   * Instantiates a new command.
   *
   * @param key Identifier of the command.
   * @param description Description of the command.
   * @param args Arguments the command takes.
   * @param callback Callback function to execute when the command is called.
   */
  constructor(
    name: string,
    description: string,
  ) {
    this.name = name;
    this.description = description;

    this.commandStructure = {
      name: this.name,
      description: this.description,
    }

    console.log(this.commandStructure);
  }

  // /**
  //  * Returns whether a message is this command.
  //  *
  //  * @param {Message} message Discord message object.
  //  * @returns {boolean} Whether the message is this command.
  //  */
  // isCommand(message: Message): boolean {
  //   return getMessageComponents(message).key === this.key;
  // }

  // /**
  //  * Executes the callback and returns a promise.
  //  *
  //  * @param {Message} message Message containing the command.
  //  * @returns {Promise<void>} Promise of the callback.
  //  */
  // async execute(message: Message): Promise<void> {
  //   const { args } = getMessageComponents(message);

  //   return await this.callback(args, message);
  // };
}
