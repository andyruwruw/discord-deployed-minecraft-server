// Packages
import {
  BitFieldResolvable,
  Intents,
  IntentsString,
} from 'discord.js';
import dotenv from 'dotenv';

// Gives us access to process.env variables.
dotenv.config();

/**
 * Discord bot token, secret key.
 */
export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN as string;

/**
 * Type of database to use.
 */
export const DATABASE_TYPE = process.env.DATABASE_TYPE || 'cache';

/**
 * URL for connecting with database if needed.
 */
export const DATABASE_URL = process.env.DATABASE_URL as string || 'mongodb://localhost:27017/';

/**
 * Response to database connection.
 */
export const DATABASE_CONNECTION_SUCCESS = 'Database connection successful.';

/**
 * Response to the ready event.
 */
export const READY_RESPONSE_STRING: string = 'Copper Bot is ready to push some buttons!';

/**
 * Default color for Discord components.
 */
export const DEFAULT_COLOR: number = 0xd9823b;

/**
 * Discord component type for an Action Row.
 */
export const ACTION_ROW_TYPE = 1;

/**
 * Keys for Discord Button component types.
 */
export const BUTTON_STYLE = {
  PRIMARY: 1,
  SECONDARY: 2,
  SUCCESS: 3,
  DESTRUCTIVE: 4,
  LINK: 5,
};

/**
 * Default minecraft dimension.
 */
export const DEFAULT_DIMENSION = 'minecraft:overworld';

/**
 * The default intents for the bot.
 */
export const DISCORD_INTENTS: BitFieldResolvable<IntentsString, number> = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  16, // Intents.FLAGS.GUILD_SCHEDULED_EVENTS 
];

/**
 * Zero width character, helps avoids conflicting with other bots.
 */
export const RESPONSE_PREFIX = '\u200B';

/**
 * Database type enum.
 */
export const DATABASE_TYPES = {
  MONGO: 'mongodb',
  CACHE: 'cache',
};

/**
 * Discord application command option types.
 */
export const APPLICATION_COMMAND_OPTION_TYPES = {
  SUB_COMMAND: 1,
  SUB_COMMAND_GROUP: 2,
  STRING: 3,
  INTEGER: 4,
  BOOLEAN: 5,
  USER: 6,
  CHANNEL: 7,
  ROLE: 8,
  MENTIONABLE: 9,
  NUMBER: 10,
};
