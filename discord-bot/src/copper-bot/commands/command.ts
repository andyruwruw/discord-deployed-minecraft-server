// Packages
import { Message } from 'discord.js';

// Local Imports
import { getMessageComponents } from '../../helpers';

/**
 * Defines a command
 */
export class Command {
  key: String;
  description: String;
  args: String[];
  callback: Function;

  /**
   * Instantiates a new command.
   *
   * @param key Identifier of the command.
   * @param description Description of the command.
   * @param args Arguments the command takes.
   * @param callback Callback function to execute when the command is called.
   */
  constructor(
    key: String,
    description: String,
    args: String[],
    callback: Function
  ) {
    this.key = key;
    this.description = description;
    this.args = args;
    this.callback = callback;
  }

  /**
   * Returns whether a message is this command.
   *
   * @param {Message} message Discord message object.
   * @returns {boolean} Whether the message is this command.
   */
  isCommand(message: Message): boolean {
    return getMessageComponents(message).key === this.key;
  }

  /**
   * Executes the callback and returns a promise.
   *
   * @param {Message} message Message containing the command.
   * @returns {Promise<void>} Promise of the callback.
   */
  async execute(message: Message): Promise<void> {
    const { args } = getMessageComponents(message);

    return await this.callback(args, message);
  };
}
