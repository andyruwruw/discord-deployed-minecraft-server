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

const NAME = 'pog';

const DESCRIPTION = 'Replies with Champ.';

const RESTRICTED_ACCESS = false;

const TYPE = ApplicationCommandTypes.CHAT_INPUT;

const OPTIONS: ApplicationCommandOptionData[] = [];

const callback = async (
  client: Client,
  connection: WebSocketConnection,
  user: User,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
): Promise<any> => {
};

const response = async (
  data: any,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
): Promise<any> => {
};

export const Pog = new Command(
  NAME,
  DESCRIPTION,
  callback,
  response,
  RESTRICTED_ACCESS,
  TYPE,
  OPTIONS,
);
