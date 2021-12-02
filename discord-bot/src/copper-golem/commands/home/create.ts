// Packages
import {
  ApplicationCommandOptionData,
  CacheType,
  CommandInteractionOptionResolver,
  User,
} from 'discord.js';
import { connection as WebSocketConnection } from 'websocket';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { APPLICATION_COMMAND_OPTION_TYPES } from '../../../config';

// Local Imports
import { Command } from '../command';
import { Database } from '../../../database/database';
import { IGuild, IUser } from '../../../database/types';
import { Context } from '../../context';
import { generateResponse } from '../../responses/home/create';
import { NAME as RESOLUTION_NAME } from '../../../web-socket/callbacks/create-home-resolution';

/**
 * Database Instance
 */
const database = new Database();

/**
 * Name of the command.
 */
const NAME = 'create';

/**
 * Description of the command.
 */
const DESCRIPTION = 'Create a new home at your current Minecraft coordinates.';

/**
 * Whether this command requires admin access.
 */
const RESTRICTED_ACCESS = false;

/**
 * Type of command.
 */
const TYPE = APPLICATION_COMMAND_OPTION_TYPES.SUB_COMMAND;

/**
 * Additional command options.
 */
const OPTIONS: ApplicationCommandOptionData[] = [
  {
    type: ApplicationCommandOptionTypes.STRING,
    name: 'name',
    description: 'Add an optional custom name for your home.',
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
  connection: WebSocketConnection,
  guild: IGuild,
  user: User,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
  isDm: boolean,
  channelId: string | null,
): Promise<any> => {
  const databaseUser: IUser = await database.getUser(
    guild.id,
    user.id,
  );

  const args: Record<string, any> = {};

  if (options.getString('name')) {
    args.name = options.getString('name');
  }

  const context = new Context(
    RESOLUTION_NAME,
    guild.id,
    user.id,
    isDm,
    channelId,
    args,
  );

  connection.send(JSON.stringify({
    type: 'player-position',
    args: [
      databaseUser.minecraftUsername,
    ],
    context: context.toObject(),
  }));

  return {};
};

export const CreateHome = new Command(
  NAME,
  DESCRIPTION,
  callback,
  generateResponse,
  RESTRICTED_ACCESS,
  TYPE,
  OPTIONS,
);
