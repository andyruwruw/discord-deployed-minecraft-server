// Packages
import { CacheType, CommandInteractionOptionResolver, User } from 'discord.js';
import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from 'discord.js/typings/enums';
// Local Imports
import { Command } from './command';

export class Unregister extends Command {
  constructor() {
    super(
      'unregister',
      'Bans the specified user',
      ApplicationCommandTypes.CHAT_INPUT,
      [{
        type: ApplicationCommandOptionTypes.STRING,
        name: 'username',
        description: 'user to ban',
        required: true,
      }],
    );
  }

  generateResponse(
    user: User,
    options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
  ) {
    let username = options.getString('username');
    return 'unregistered ' + username;
  }
}