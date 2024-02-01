// Local Imports
import { UsedAbstractHandlerError } from '../errors/used-abstract-handler-error';

// Types
import {
  DiscordBotInterface,
  MinecraftServerInterface,
} from '../types';
import { DatabaseInterface } from '../types/database';

/**
 * Abstract event handler.
 */
export class Handler<T> {
  /**
   * Static reference to Minecraft server.
   */
  static Minecraft: MinecraftServerInterface;

  /**
   * Static reference to Discord Bot.
   */
  static Discord: DiscordBotInterface;

  /**
   * Static reference to Database.
   */
  static Database: DatabaseInterface;

  /**
   * Sets static Minecraft instance.
   *
   * @param {MinecraftServerInterface} minecraft Minecraft instance. 
   */
  static setMinecraft(minecraft: MinecraftServerInterface) {
    Handler.Minecraft = minecraft;
  }

  /**
   * Sets static Discord instance.
   *
   * @param {DiscordBotInterface} discord Discord instance. 
   */
  static setDiscord(discord: DiscordBotInterface) {
    Handler.Discord = discord;
  }

  /**
   * Sets static Database instance.
   *
   * @param {DatabaseInterface} database Database instance. 
   */
  static setDatabase(database: DatabaseInterface) {
    Handler.Database = database;
  }

  /**
   * Handles the event.
   * 
   * @param {T} payload Event payload.
   */
  async execute(payload: T): Promise<void> {
    throw new UsedAbstractHandlerError();
  }
}
