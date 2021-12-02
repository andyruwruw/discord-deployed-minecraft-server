// Packages
import {
  ApplicationCommandOptionData,
  CacheType,
  Client,
  CommandInteractionOptionResolver,
  User,
} from 'discord.js';
import { connection as WebSocketConnection } from 'websocket';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { APPLICATION_COMMAND_OPTION_TYPES } from '../../../config';

// Local Imports
import { Command } from '../command';
import { Database } from '../../../database/database';

/**
 * Database Instance
 */
 const database = new Database();

const NAME = 'delete';

const DESCRIPTION = 'Delete a saved home coordinates.';

const RESTRICTED_ACCESS = false;

const TYPE = APPLICATION_COMMAND_OPTION_TYPES.SUB_COMMAND;

const OPTIONS: ApplicationCommandOptionData[] = [
  {
    type: ApplicationCommandOptionTypes.STRING,
    name: 'name',
    description: 'Optional name if you have more than two homes.',
    required: false,
  },
];

/**
 * Callback run on command.
 *
 * @param {WebSocketConnection} connection Connection to guild's server.
 * @param {IGuild} guild Database entry for the guild.
 * @param {User} user User that ran the command.
 * @param {Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>} options Interaction options.
 * @param {boolean} isDm Whether this command was sent via a DM.
 * @param {string | null} channelId The channel ID used to send this command, or null if DM.
 * @returns {any} Data to be used in response.
 */
const callback = async (
  client: Client,
  connection: WebSocketConnection,
  user: User,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
  isDm: boolean,
  channelId: string | null,
): Promise<any> => {
};

const response = async (
  data: any,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
): Promise<DiscordResponse> => {
};

export const DeleteHome = new Command(
  NAME,
  DESCRIPTION,
  callback,
  response,
  RESTRICTED_ACCESS,
  TYPE,
  OPTIONS,
);
