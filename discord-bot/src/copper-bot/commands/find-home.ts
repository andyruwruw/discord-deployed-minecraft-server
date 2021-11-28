
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

const FIND_HOME_NAME = 'findhome';

const FIND_HOME_DESCRIPTION = 'Displays coordinates of a user\'s home.';

const FIND_HOME_COMMAND_OPTIONS: ApplicationCommandOptionData[] = [
  {
    type: ApplicationCommandOptionTypes.STRING,
    name: 'username',
    description: 'user to get home of',
    required: true,
  },
];

/**
 * Command to find someones home.
 */
export class FindHome extends Command {
  /**
   * Instantiates a new FindHome command.
   */
  constructor() {
    super(
      FIND_HOME_NAME,
      FIND_HOME_DESCRIPTION,
      ApplicationCommandTypes.CHAT_INPUT,
      FIND_HOME_COMMAND_OPTIONS,
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
    return 'got home of ' + username;
  }
}
