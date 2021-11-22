// Packages
import {
  BitFieldResolvable,
  Intents,
  IntentsString,
} from 'discord.js';

// Response to the ready event
export const READY_RESPONSE_STRING: string = 'Copper Bot is ready to push some buttons!';

// Events discord will inform our bot on.
export const DISCORD_INTENTS: BitFieldResolvable<IntentsString, number> = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  16, // Intents.FLAGS.GUILD_SCHEDULED_EVENTS 
];

// Zero width character, helps avoids conflicting with other bots.
export const RESPONSE_PREFIX = '\u200B';
