// Packages
import {
  Client,
  ClientOptions,
  Interaction,
  Message,
} from 'discord.js';

// Local Imports
import {
  DiscordErrorHandler,
  DiscordInteractionHandler,
  DiscordMessageCreateHandler,
  DiscordReadyHandler,
} from '../handlers';
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
    // When the Discord bot is ready.
    this.on(
      'ready',
      (client: Client) => (DiscordReadyHandler.execute(client)),
    );
    // On a Discord bot error.
    this.on(
      'error',
      (error: Error) => (DiscordErrorHandler.execute(error)),
    );
    // On a Discord interaction.
    this.on(
      'interactionCreate',
      (interaction: Interaction) => (DiscordInteractionHandler.execute(interaction)),
    );
    // On a Discord message.
    this.on(
      'messageCreate',
      (message: Message) => (DiscordMessageCreateHandler.execute(message)),
    );
  }
}
