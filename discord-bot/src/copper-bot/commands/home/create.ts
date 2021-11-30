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
import { DiscordResponse } from 'src/copper-bot/responses';
import { Database } from '../../../database/database';
import { IGuild } from 'src/database/types';

const NAME = 'create';

const DESCRIPTION = 'Create a new home at your current Minecraft coordinates.';

const RESTRICTED_ACCESS = false;

const TYPE = APPLICATION_COMMAND_OPTION_TYPES.SUB_COMMAND;

const OPTIONS: ApplicationCommandOptionData[] = [
  {
    type: ApplicationCommandOptionTypes.STRING,
    name: 'name',
    description: 'Add an optional custom name for your home.',
    required: false,
  },
];

const callback = async (
  connection: WebSocketConnection,
  database: Database,
  guild: IGuild,
  user: User,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
): Promise<any> => {
};

const response = async (
  data: any,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
): Promise<DiscordResponse> => {
};

export const CreateHome = new Command(
  NAME,
  DESCRIPTION,
  callback,
  response,
  RESTRICTED_ACCESS,
  TYPE,
  OPTIONS,
);
