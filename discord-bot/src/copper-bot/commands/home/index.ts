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
import { CreateHome } from './create';
import { DeleteHome } from './delete';
import { FindHomes } from './find';

const NAME = 'home';

const DESCRIPTION = 'Create and find other people\'s home coordinates.';

const RESTRICTED_ACCESS = false;

const TYPE = ApplicationCommandTypes.CHAT_INPUT;

const OPTIONS: ApplicationCommandOptionData[] = [];

const SUB_COMMANDS = [
  CreateHome,
  FindHomes,
  DeleteHome,
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

export const Home = new Command(
  NAME,
  DESCRIPTION,
  callback,
  response,
  RESTRICTED_ACCESS,
  TYPE,
  OPTIONS,
  SUB_COMMANDS,
);
