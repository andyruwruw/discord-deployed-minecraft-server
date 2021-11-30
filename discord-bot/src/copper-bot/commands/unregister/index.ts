// Packages
import {
  ApplicationCommandOptionData,
  CacheType,
  Client,
  CommandInteractionOptionResolver,
  User,
} from 'discord.js';
import { connection as WebSocketConnection } from 'websocket';
import { ApplicationCommandTypes } from 'discord.js/typings/enums';

// Local Imports
import { Command } from '../command';
import { Database } from '../../../database/database';

const NAME = 'unregister';

const DESCRIPTION = 'Banish someone';

const RESTRICTED_ACCESS = true;

const TYPE = ApplicationCommandTypes.CHAT_INPUT;

const OPTIONS: ApplicationCommandOptionData[] = [

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

export const Unregister = new Command(
  NAME,
  DESCRIPTION,
  callback,
  response,
  RESTRICTED_ACCESS,
  TYPE,
  OPTIONS,
);
