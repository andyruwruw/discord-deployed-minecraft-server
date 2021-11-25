// Packages
import { CacheType, CommandInteractionOptionResolver, User } from 'discord.js';
import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from 'discord.js/typings/enums';
// Local Imports
import { Command } from './command';

export class Stats extends Command {
  constructor() {
    super( 
      'stats',
      'shows online time and chart of activity for specified user',
      ApplicationCommandTypes.CHAT_INPUT,
      [{
          type: ApplicationCommandOptionTypes.STRING,
          name: 'username',
          description: 'user to get stats for',
          required: true,
      }],
    );
  }

  generateResponse(
    user: User,
    options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ) {
    let username = options.getString('username');
    return 'got stats for ' + username;
  }
}