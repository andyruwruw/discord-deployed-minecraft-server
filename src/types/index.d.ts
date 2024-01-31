// Packages
import { Client } from 'discord.js';

/**
 * Basic Dictionary.
 */
export type Dictionary<T> = Record<string, T>;

/**
 * Discord bot.
 */
export type DiscordBotInterface = Client;

/**
 * Minecraft server wrapper.
 */
export interface MinecraftServerInterface {
  /**
   * Starts the server.
   */
  start: () => Promise<void>;

  /**
   * Stops the server.
   */
  stop: () => Promise<void>;

  /**
   * Runs a command on the server.
   *
   * @param {string} command Command to run.
   */
  runCommand(command: string): Promise<void>;
}

/**
 * Playtime ranks.
 */
export interface PlaytimeRank {
  /**
   * ID of the rank.
   */
  id: RankRoleType;

  /**
   * Hours per rank.
   */
  hours: number;

  /**
   * Name of the rank.
   */
  name: string;
}
