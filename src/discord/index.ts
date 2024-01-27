// Packages
import {
  Client,
  ClientOptions,
  Interaction,
  Message,
} from 'discord.js';

// Local Imports
import {
  ErrorHandler,
  InteractionHandler,
  MessageCreateHandler,
  ReadyHandler,
} from './handlers';
import { Handler } from './handlers/handler';

/**
 * Our little buddy.
 */
export class DiscordBot extends Client {
  /**
   * Instantiates the Discord Bot, calling discord.js' Client constructor.
   *
   * @param {ClientOptions} options Options for the client.
   */ 
  constructor(options: ClientOptions) {
    super(options);

    // Connect handlers.
    Handler.setClient(this);
    this._setEventHandlers();
  }

  /**
   * Assigns event listeners for Discord and websockets.
   */
  _setEventHandlers(): void {
    // Discord Events
    this.on('ready', (client: Client) => ReadyHandler.execute(client));
    this.on('error', (error: Error) => ErrorHandler.execute(error));
    this.on('interactionCreate', (interaction: Interaction) => InteractionHandler.execute(interaction));
    this.on('messageCreate', (message: Message) => MessageCreateHandler.execute(message));
  }
}
