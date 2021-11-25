// Packages
import { CacheType, CommandInteractionOptionResolver, User } from 'discord.js';
import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from 'discord.js/typings/enums';
// Local Imports
import { Command } from './command';

export class FindHome extends Command {
  constructor() {
    super( 
      'findhome',
      'gets home of specified user',
      ApplicationCommandTypes.CHAT_INPUT,
      [{
          type: ApplicationCommandOptionTypes.STRING,
          name: 'username',
          description: 'user to get home of',
          required: true,
      }],
    );
  }

  generateResponse(
    user: User,
    options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ) {
    let username = options.getString('username');
    return 'got home of ' + username;
  }
}