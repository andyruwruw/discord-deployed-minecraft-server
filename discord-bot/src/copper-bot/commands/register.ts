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

const REGISTER_NAME = 'register';

const REGISTER_DESCRIPTION = 'Registers a user with the minecraft server and discord bot.';

const REGISTER_COMMAND_OPTIONS: ApplicationCommandOptionData[] = [
  {
    type: ApplicationCommandOptionTypes.STRING,
    name: 'username',
    description: 'Minecraft username to be whitelisted.',
    required: true,
  },
];

/**
 * Command to register a new player with the server.
 */
export class Register extends Command {
  /**
   * Instantiates a new Register command.
   */
  constructor() {
    super(
      REGISTER_NAME,
      REGISTER_DESCRIPTION,
      ApplicationCommandTypes.CHAT_INPUT,
      REGISTER_COMMAND_OPTIONS,
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
    return 'registered ' + username;
  }
}
