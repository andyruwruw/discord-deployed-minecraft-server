// Packages
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Static methods for retrieving environment variables.
 */
export class Environment {
  /**
   * Pregenerated secret.
   */
  static generateSecret = (Math.random() + 1).toString(36).substring(7);

  /**
   * Retrieves discord bot token.
   *
   * @returns {string} Discord token.
   */
  static getDiscordBotToken(): string {
    return process.env.DISCORD_BOT_TOKEN as string | '';
  }

  /**
   * Retrieves Discord application ID.
   *
   * @returns {string} Discord application ID.
   */
  static getDiscordApplicationId(): string {
    return process.env.DISCORD_APPLICATION_ID as string || '';
  }

  /**
   * Directory of the server jar.
   *
   * @returns {string} Server jar directory.
   */
  static getServerJarDirectory(): string {
    return process.env.SERVER_JAR_DIRECTORY as string || '.';
  }

  /**
   * Name of the server jar.
   *
   * @returns {string} Server jar name.
   */
  static getServerJarName(): string {
    return process.env.SERVER_JAR_NAME as string || 'server.jar';
  }

  /**
   * Port for RCON connection.
   *
   * @returns {number} RCON minecraft port.
   */
  static getRconPort(): number {
    return parseInt(process.env.RCON_PORT as string, 10) || 25575;
  }

  /**
   * Password for RCON connection.
   *
   * @returns {string} RCON minecraft password.
   */
  static getRconPassword(): string {
    return process.env.RCON_PASSWORD as string || '';
  }
  
  /**
   * Retrieves password for connecting with database if needed.
   *
   * @returns {string} Password for connecting with database if needed.
   */
  static getDatabasePassword(): string {
    return process.env.DATABASE_PASSWORD as string || '';
  }

  /**
   * Retrieves URL for connecting with database if needed.
   *
   * @returns {string} URL for connecting with database if needed.
   */
  static getDatabaseUrl(): string {
    return process.env.DATABASE_URL as string || 'mongodb://localhost:27017/';
  }

  /**
   * Retrieves username for connecting with database if needed.
   *
   * @returns {string} Username for connecting with database if needed.
   */
  static getDatabaseUser(): string {
    return process.env.DATABASE_USER as string || 'server';
  }

  /**
   * Retrieves type of database to use.
   *
   * @returns {string} Type of database to use.
   */
  static getDatabaseType(): string {
    return process.env.DATABASE_TYPE || 'cache';
  }

  /**
   * Retrieves server secret.
   *
   * @returns {string} Server secret.
   */
  static getSecret(): string {
    return process.env.SECRET as string || Environment.generateSecret;
  }

  /**
   * Whether log layer DEBUG is enabled.
   *
   * @returns {boolean} Whether log layer DEBUG is enabled.
   */
  static isDebugLayerEnabled(): boolean {
    return process.env.ENABLE_DEBUG_LAYER === 'true';
  }

  /**
   * Whether log layer PROGRESS is enabled.
   *
   * @returns {boolean} Whether log layer PROGRESS is enabled.
   */
  static isProgressLayerEnabled(): boolean {
    return process.env.ENABLE_PROGRESS_LAYER === 'true';
  }

  /**
   * Whether log layer SUCCESS is enabled.
   *
   * @returns {boolean} Whether log layer SUCCESS is enabled.
   */
  static isSuccessLayerEnabled(): boolean {
    return process.env.ENABLE_SUCCESS_LAYER === 'true';
  }

  /**
   * Whether log layer UPDATE is enabled.
   *
   * @returns {boolean} Whether log layer UPDATE is enabled.
   */
  static isUpdateLayerEnabled(): boolean {
    return process.env.ENABLE_UPDATE_LAYER === 'true';
  }

  /**
   * Whether log layer WARNING is enabled.
   *
   * @returns {boolean} Whether log layer WARNING is enabled.
   */
  static isWarningLayerEnabled(): boolean {
    return process.env.ENABLE_WARNING_LAYER === 'true';
  }
}
