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
import { generateResponse } from '../../responses/pog';
import { DiscordResponse } from '../../responses';

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
  isDm: boolean,
  channelId: string | null,
): Promise<any> => {
};

export const Pog = new Command(
  NAME,
  DESCRIPTION,
  callback,
  generateResponse,
  RESTRICTED_ACCESS,
  TYPE,
  OPTIONS,
);
