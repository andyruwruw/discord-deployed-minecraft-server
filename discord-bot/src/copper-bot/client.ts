// Packages
import {
  Client,
  ClientOptions,
  Message,
} from 'discord.js';

// Local Imports
import { READY_RESPONSE_STRING } from '../config';
import { getCommand, isMention } from '../helpers';

// Our little buddy
export class CopperBot extends Client {
  /**
   * Instantiates the Copper Bot, calling discord.js' Client constructor.
   *
   * @param options Options for the client.
   */
  constructor(options: ClientOptions) {
    super(options);

    this.on('ready', this.handleConnect);
    this.on('message', this.handleMessage);
  }

  /**
   * Handles the bot connecting to discord.
   */
  handleConnect() {
    console.log(READY_RESPONSE_STRING);
  }

  /**
   * Handles messages recieved by the bot.
   *
   * @param {Message} message Message in question.
   */
  handleMessage(message: Message) {
    if (isMention(message, this)) {
      const command = getCommand(message);

      if (command) {
        command.execute(message);
      }
    }
  }
}
