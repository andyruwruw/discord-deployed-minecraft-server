// Packages
import {
  CacheType,
  CommandInteractionOptionResolver,
  User,
} from 'discord.js';

// Local Imports
import { Command } from './command';

const SET_HOME_NAME = 'sethome';

const SET_HOME_DESCRIPTION = 'Sets your home coordinates to wherever you are in game.';

/**
 * Command to set your home.
 */
export class SetHome extends Command {
  /**
   * Instantiates a new SetHome command.
   */
  constructor() {
    super(
      SET_HOME_NAME,
      SET_HOME_DESCRIPTION,
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
    return 'set home for ' + username;
  }
}
