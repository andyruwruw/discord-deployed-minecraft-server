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
import { AchievementStats } from './achievements';
import { PlaytimeStats } from './playtime';
import { Database } from '../../../database/database';

const NAME = 'stats';

const DESCRIPTION = 'View your own or other\'s server playtime and achievements.';

const RESTRICTED_ACCESS = false;

const TYPE = ApplicationCommandTypes.CHAT_INPUT;

const OPTIONS: ApplicationCommandOptionData[] = [];

const SUB_COMMANDS = [
  PlaytimeStats,
  AchievementStats,
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

export const Stats = new Command(
  NAME,
  DESCRIPTION,
  callback,
  response,
  RESTRICTED_ACCESS,
  TYPE,
  OPTIONS,
  SUB_COMMANDS,
);
