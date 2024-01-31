// Packages
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ButtonStyle,
  ComponentType,
  IntentsBitField,
} from 'discord.js';

// Types
import {
  ChannelType,
  RoleType,
} from '../types/tables';

/**
 * Default color for Discord components.
 */
export const DEFAULT_COLOR = 0xd9823b;

/**
 * Zero width character, helps avoids conflicting with other bots.
 */
export const RESPONSE_PREFIX = '\u200B';

/**
 * Generates Invite Link
 *
 * @param {string} clientId Discord bot Id.
 * @returns {string} Invite link.
 */
export const INVITE_LINK = (clientId: string): string => (`https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=1644972469495&scope=bot%20applications.commands`);

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
  IntentsBitField.Flags.MessageContent,
  IntentsBitField.Flags.GuildModeration,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.GuildPresences,
];

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
 * Discord role enum.
 */
export const DISCORD_ROLE = {
  OP: 'op',
  ONLINE: 'online',
  DIRT: 'dirt',
  DIAMOND: 'diamond',
  WOOD: 'wood',
  STONE: 'stone',
  IRON: 'iron',
  GOLD: 'gold',
  NETHERITE: 'netherite',
  MOST_PLAYTIME: 'most-playtime',
  MOST_ACHIEVEMENTS: 'most-achievements',
  ALL_ACHIEVEMENTS: 'all-achievements',
  MOST_DEATHS: 'most-deaths',
} as Record<string, RoleType>;

/**
 * Discord channel enum.
 */
export const DISCORD_CHANNEL = {
  BROADCAST: 'broadcast',
  CONSOLE: 'console',
  BULLETIN_BOARD: 'bulletin-board',
  GENERAL: 'general',
  WHITELIST: 'whitelist',
} as Record<string, ChannelType>;
