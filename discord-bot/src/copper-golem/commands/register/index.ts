// Packages
import {
  ApplicationCommandOptionData,
  CacheType,
  CommandInteractionOptionResolver,
  User,
} from 'discord.js';
import { connection as WebSocketConnection } from 'websocket';
import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from 'discord.js/typings/enums';

// Local Imports
import { Command } from '../command';
import { Database } from '../../../database/database';
import { IGuild } from '../../../database/types';

const NAME = 'register';

const DESCRIPTION = 'Register your Minecraft account with the Discord bot to play!';

const RESTRICTED_ACCESS = false;

const TYPE = ApplicationCommandTypes.CHAT_INPUT;

const OPTIONS: ApplicationCommandOptionData[] = [
  {
    type: ApplicationCommandOptionTypes.STRING,
    name: 'minecraft username',
    description: 'Your minecraft username to be whitelisted.',
    required: true,
  },
];

const callback = async (
  connection: WebSocketConnection,
  database: Database,
  guild: IGuild,
  user: User,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
  isDm: boolean,
  channelId: string | null,
): Promise<any> => {
  await database.updateUserMinecraftUsername(
    guild.id,
    user.id,
    options.getString('minecraft username') as string,
  );

  
};

const response = async (
  data: any,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
): Promise<DiscordResponse> => {
};

export const Register = new Command(
  NAME,
  DESCRIPTION,
  callback,
  response,
  RESTRICTED_ACCESS,
  TYPE,
  OPTIONS,
);
