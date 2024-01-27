// Local Imports
import { getDatabase } from './database';
import { MinecraftServer } from './minecraft';
import { DiscordBot } from './discord';

// Types
import { Database } from './database/database';
import { DISCORD_INTENTS } from './config/discord';
import { Environment } from './helpers/environment';

/**
 * Runs all connections.
 */
export class Server {
  /**
   * Minecraft server wrapper.
   */
  static Minecraft: MinecraftServer;

  /**
   * Discord connection wrapper.
   */
  static Discord: DiscordBot;

  /**
   * Database connection.
   */
  static Database: Database;

  /**
   * Starts the server.
   */
  static start() {
    Server.Minecraft = new MinecraftServer();
    Server.Discord = new DiscordBot({
      intents: DISCORD_INTENTS,
    });
    Server.Database = getDatabase();

    Server.Minecraft.start();
    Server.Database.connect();
    // Logging bot into Discord.
    Server.Discord.login(Environment.getDiscordBotToken());
  }
}

// Start the server.
Server.start();
