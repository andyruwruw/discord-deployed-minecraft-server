// Packages
import { CacheType, CommandInteractionOptionResolver, User } from 'discord.js';
import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from 'discord.js/typings/enums';
// Local Imports
import { Command } from './command';

export class SetHome extends Command {
  constructor() {
    super(
      'sethome',
      'sets the home of the specified user',
      ApplicationCommandTypes.CHAT_INPUT,
      [{
        type: ApplicationCommandOptionTypes.STRING,
        name: 'username',
        description: 'user to set home for',
        required: true,
      }],
    );
  }

  generateResponse(
    user: User,
    options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
  ) {
    let username = options.getString('username');
    return 'set home for ' + username;
  }
}