// Local Imports
import { getDatabase } from './database';
import { MinecraftServer } from './minecraft';
import { DiscordBot } from './discord';

// Types
import { DISCORD_INTENTS } from './config/discord';
import { Environment } from './helpers/environment';
import { Database } from './database/database';
import { Handler } from './handlers/handler';

/**
 * Runs all processes.
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
  static start(): void {
    // Instantiate various processes
    Server.Minecraft = new MinecraftServer();
    Server.Discord = new DiscordBot({ intents: DISCORD_INTENTS });
    Server.Database = getDatabase();

    // Start them each.
    Server.Minecraft.start();
    Server.Database.connect();
    Server.Discord.login(Environment.getDiscordBotToken());

    // Assign static references.
    Handler.setMinecraft(Server.Minecraft);
    Handler.setDiscord(Server.Discord);
    Handler.setDatabase(Server.Database);
  }
}

// Start the server.
Server.start();
