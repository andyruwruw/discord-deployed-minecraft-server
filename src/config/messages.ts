// Types
import { Player } from '../types/tables';

/**
 * Response to database connection.
 */
export const MESSAGE_DATABASE_CONNECTION_SUCCESS = 'Database connection successful.';

/**
 * Response to database connection.
 */
export const MESSAGE_DATABASE_CACHE_CONNECTION_SUCCESS = 'Connected to cache database for testing purposes, change to MongoDB for production.';

/**
 * Error message thrown when abstract database is used.
 */
export const MESSAGE_USED_ABSTRACT_DATABASE_ERROR = 'Attempted to use Abstract Database, use a concrete implementation instead.';

/**
 * Error message thrown when abstract data access object is used.
 */
export const MESSAGE_USED_ABSTRACT_DAO_ERROR = 'Attempted to use Abstract Data Access Object, use a concrete implementation instead.';

/**
 * Error message thrown when abstract component is used.
 */
export const MESSAGE_USED_ABSTRACT_COMPONENT_ERROR = 'Attempted to use Abstract Component, use a concrete implementation instead.';

/**
 * Error message thrown when database URL is missing.
 */
export const MESSAGE_DATABASE_URL_MISSING_ERROR = 'Database URL not set in .env!';

/**
 * Internal server error message.
 */
export const MESSAGE_INTERNAL_SERVER_ERROR = 'Internal Server Error';

/**
* Error message for using abstract handler.
*/
export const MESSAGE_USED_ABSTRACT_HANDLER_ERROR = 'Attempted to use Abstract Handler, use a concrete implementation instead.';

/**
 * Response to the ready event.
 */
export const MESSAGE_READY = 'Discord bot up and running!';

/**
 * Logs URL to invite bot.
 *
 * @param {string} url Invite URL.
 * @returns {string} Message for inviting bot.
 */
export const MESSAGE_INVITE_LINK = (url: string): string => (`You can invite the bot to a server using this link: ${url}`);

/**
 * Response to the ready event.
 */
export const MESSAGE_COMMANDS_REGISTERED = 'Registered commands with Discord and all Guilds.';

/**
 * Message to indicate command registration has begun.
 */
export const MESSAGE_COMMANDS_REGISTER_START = 'Attempting to register all commands with Discord';

/**
 * Message to notify of application command update.
 *
 * @param {string} id Application command Id.
 * @returns {string} Message.
 */
export const MESSAGE_COMMANDS_UPDATE = (
  id: string,
  isApplication: boolean = true,
) => `${isApplication ? 'Application' : 'Guild'} command ${id} changed, deleting for update.`;

/**
 * Response to data sync completion.
 */
export const MESSAGE_DATA_SYNCED = 'Database synced with Discord.';

/**
 * Message for Data Sync Start.
 */
export const MESSAGE_DATA_SYNC_START = 'Syncing database with Discord.';

/**
 * Error message for using abstract command.
 */
export const MESSAGE_USED_ABSTRACT_COMMAND_ERROR = 'Attempted to use Abstract Command, use a concrete implementation instead.';

/**
 * Message when server approves EULA.
 */
export const EULA_APPROVED ='EULA approved, you\'re welcome!';

/**
 * Broadcast message for user getting an achievement.
 *
 * @param {string} username User's username.
 * @param {string} achievement Achievement gained.
 * @returns {string} Broadcast message.
 */
export const ACHIEVEMENT_BROADCAST = (
  username: string,
  achievement: string,
): string => (`${username} just got "${achievement}"`);

/**
 * Broadcast message for playtime leaderboard.
 *
 * @param {Player[]} players Players with top playtime.
 * @returns {string} Broadcast message. 
 */
export const PLAYTIME_LEADBOARD_BROADCAST = (players: Player[]): string => {
  let message = '**New Playtime Leaderboard**\n';

  for (let i = 0; i < players.length; i += 1) {
    const hours = Math.round(players[i].hours * 10) / 10;

    message = message.concat(`${players[i].minecraft}: *${hours} Hours*\n`);
  }

  return message;
}

/**
 * Broadcast message for achievement leaderboard.
 *
 * @param {Player[]} players Players with top achievements.
 * @returns {string} Broadcast message. 
 */
export const ACHIEVEMENT_LEADBOARD_BROADCAST = (players: Player[]): string => {
  let message = '**New Achievements Leaderboard**\n';

  for (let i = 0; i < players.length; i += 1) {
    message = message.concat(`${players[i].minecraft}: *${players[i].achievements} Achievements*\n`);
  }

  return message;
}

/**
 * Broadcast message for deaths leaderboard.
 *
 * @param {Player[]} players Players with top deaths.
 * @returns {string} Broadcast message. 
 */
export const DEATHS_LEADBOARD_BROADCAST = (players: Player[]): string => {
  let message = '**New Deaths Leaderboard**\n';

  for (let i = 0; i < players.length; i += 1) {
    message = message.concat(`${players[i].minecraft}: *${players[i].deaths} Deaths*\n`);
  }

  return message;
}

/**
 * Message for when the server is up.
 */
export const SERVER_START = 'The server is back up and running! Connect via "peoplewhoarent.cool".';
