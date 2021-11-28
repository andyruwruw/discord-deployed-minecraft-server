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

const UNREGISTER_NAME = 'findhome';

const UNREGISTER_DESCRIPTION = 'Displays coordinates of a user\'s home.';

const UNREGISTER_COMMAND_OPTIONS: ApplicationCommandOptionData[] = [
  {
    type: ApplicationCommandOptionTypes.STRING,
    name: 'username',
    description: 'User to unregister from server whitelist.',
    required: true,
  },
];

/**
 * Command to unregister a user.
 */
export class Unregister extends Command {
  /**
   * Instantiates a new Unregister command.
   */
  constructor() {
    super(
      UNREGISTER_NAME,
      UNREGISTER_DESCRIPTION,
      ApplicationCommandTypes.CHAT_INPUT,
      UNREGISTER_COMMAND_OPTIONS,
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
    return 'unregistered ' + username;
  }
}
