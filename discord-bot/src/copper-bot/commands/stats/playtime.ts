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

const NAME = 'playtime';

const DESCRIPTION = 'View your own or other\'s playtime on the server.';

const RESTRICTED_ACCESS = false;

const TYPE = APPLICATION_COMMAND_OPTION_TYPES.SUB_COMMAND;

const OPTIONS: ApplicationCommandOptionData[] = [
  {
    type: ApplicationCommandOptionTypes.USER,
    name: 'user',
    description: 'Optional discord user, defaults to yourself if nothing provided.',
    required: false,
  },
];

const callback = async (
  client: Client,
  connection: WebSocketConnection,
  database: Database,
  user: User,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
): Promise<any> => {
};

const response = async (
  data: any,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
): Promise<DiscordResponse> => {
};

export const PlaytimeStats = new Command(
  NAME,
  DESCRIPTION,
  callback,
  response,
  RESTRICTED_ACCESS,
  TYPE,
  OPTIONS,
);
