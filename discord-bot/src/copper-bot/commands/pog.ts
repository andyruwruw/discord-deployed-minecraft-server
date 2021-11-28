// Local Imports
import {
  CacheType,
  CommandInteractionOptionResolver,
  User,
} from 'discord.js';
import { Command } from './command';

const POG_NAME = 'pog';

const POG_DESCRIPTION = 'Replies with Champ.';

/**
 * Basic discord pog command.
 */
export class Pog extends Command {
  /**
   * Instantiates a new Pog command.
   */
  constructor() {
    super( 
      POG_NAME,
      POG_DESCRIPTION,
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
    options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>, /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ) {
    return 'Champ';
  }
}
