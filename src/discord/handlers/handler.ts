/**
 * The Handler class is abstract and defines methods
 * used by all handlers, namely holding references
 * to the database and discord.js client.
 * 
 * Use of this class is limited to concrete commands
 * inheriting from this class.
 */

// Local Imports
import { DiscordBot } from '../';

/**
 * Abstract handler class.
 */
export class Handler<T> {
  /**
   * Static reference to Discord bot client.
   */
  static _client: DiscordBot;

  /**
   * Sets static reference to Discord bot client.
   *
   * @param {DiscordBot} client Reference to Discord bot client.
   */
  static setClient(client: DiscordBot) {
    Handler._client = client;
  }

  /**
   * Handles the event.
   */
  execute(...args: T[]) {
    throw new Error('Used abstract Discord handler!');
  }
}
