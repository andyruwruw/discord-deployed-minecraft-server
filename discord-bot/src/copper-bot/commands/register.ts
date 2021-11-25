// Packages
import { CacheType, CommandInteractionOptionResolver } from 'discord.js';
import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from 'discord.js/typings/enums';
// Local Imports
import { Command } from './command';

export class Register extends Command {
  constructor() {
    super( 
      'register',
      'Whitelists the specified user',
      ApplicationCommandTypes.CHAT_INPUT,
      [{
          type: ApplicationCommandOptionTypes.STRING,
          name: 'username',
          description: 'user to whitelist',
          required: true,
      }],
    );
  }

  generateResponse(
    options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ) {
    let username = options.getString('username');
    return 'registered ' + username;
  }
}