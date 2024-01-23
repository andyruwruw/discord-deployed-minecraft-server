// Packages
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ButtonStyle,
  ComponentType,
  IntentsBitField,
} from 'discord.js';

/**
 * Discord application command option types.
 */
export const APPLICATION_COMMAND_OPTION_TYPES: Record<string, ApplicationCommandOptionType> = {
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

/**
 * Discord application command types.
 */
export const APPLICATION_COMMAND_TYPES: Record<string, ApplicationCommandType> = {
  CHAT_INPUT: 1,
  USER: 2,
  MESSAGE: 3,
};

/**
 * Keys for Discord Button component types.
 */
export const BUTTON_STYLE: Record<string, ButtonStyle> = {
  PRIMARY: 1,
  SECONDARY: 2,
  SUCCESS: 3,
  DESTRUCTIVE: 4,
  LINK: 5,
};

/**
 * Discord message component types.
 */
export const COMPONENT_TYPE: Record<string, ComponentType> = {
  ACTION_ROW: 1,
  BUTTON: 2,
  STRING_SELECT: 3,
  TEXT_INPUT: 4,
  USER_SELECT: 5,
  ROLE_SELECT: 6,
  MENTIONABLE_SELECT: 7,
  CHANNEL_SELECT: 8,
};

/**
 * Default color for Discord components.
 */
export const DEFAULT_COLOR: number = 0xd9823b;

/**
 * The default intents for the bot.
 */
export const DISCORD_INTENTS: number[] = [
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.GuildMessageReactions,
  IntentsBitField.Flags.DirectMessages,
  IntentsBitField.Flags.DirectMessageReactions,
  IntentsBitField.Flags.GuildScheduledEvents,
];

/**
 * Generates Invite Link
 *
 * @param {string} clientId Discord bot Id.
 * @returns {string} Invite link.
 */
export const INVITE_LINK = (clientId: string) => (`https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=1644972469495&scope=bot%20applications.commands`);

/**
 * Zero width character, helps avoids conflicting with other bots.
 */
export const RESPONSE_PREFIX = '\u200B';
