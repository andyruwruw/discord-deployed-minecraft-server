// Packages
import {
  ApplicationCommandOptionData,
  CacheType,
  CommandInteractionOptionResolver,
  User,
} from 'discord.js';
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
} from 'discord.js/typings/enums';

// Local Imports
import { Command } from './command';

const STATS_NAME = 'stats';

const STATS_DESCRIPTION = 'Shows statistics for specified user.';

const STATS_COMMAND_OPTIONS: ApplicationCommandOptionData[] = [
  {
    type: ApplicationCommandOptionTypes.STRING,
    name: 'username',
    description: 'User to get the stats of',
    required: true,
  },
];

/**
 * Command to show someones stats.
 */
export class Stats extends Command {
  /**
   * Instantiates a new Stats command.
   */
  constructor() {
    super(
      STATS_NAME,
      STATS_DESCRIPTION,
      ApplicationCommandTypes.CHAT_INPUT,
      STATS_COMMAND_OPTIONS,
    );
  }

  /**
   * Generates a new response for the command.
   *
   * @param {User} user User object that has username, roles, etc.
   * @param {Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>} options Options object given from the interaction, used to parse user input
   */
  generateResponse(
    user: User, /* eslint-disable-line @typescript-eslint/no-unused-vars */
    options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
  ) {
    let username = options.getString('username');
    return 'got stats for ' + username;
  }
}
