// Packages
import {
  Client,
  ClientOptions,
  Interaction,
  Message,
} from 'discord.js';

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
    this._setEventHandlers();
  }

  /**
   * Assigns event listeners for Discord and websockets.
   */
  _setEventHandlers() {
    // Discord Events
    this.on('ready', (client: Client) => ReadyHandler.execute(client));
    this.on('error', (error: Error) => ErrorHandler.execute(error));
    this.on('interactionCreate', (interaction: Interaction) => InteractionHandler.execute(interaction));
    this.on('messageCreate', (message: Message) => MessageCreateHandler.execute(message));
  }
}
