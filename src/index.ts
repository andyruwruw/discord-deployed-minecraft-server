// Local Imports
import { getDatabase } from './database';
import { MincraftServer } from './minecraft';
import { DiscordBot } from './discord';

// Types
import { Database } from './database/database';

/**
 * Runs all connections.
 */
class Server {
  /**
   * Minecraft server wrapper.
   */
  static Minecraft: MincraftServer;

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
    Server.Minecraft = new MincraftServer();
    Server.Discord = new DiscordBot();
    Server.Database = getDatabase();

    Server.Minecraft.start();
    Server.Database.connect();
  }
}

// Start the server.
Server.start();
