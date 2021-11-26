// Packages
import { CacheType, CommandInteractionOptionResolver, User } from 'discord.js';
import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from 'discord.js/typings/enums';
// Local Imports
import { Command } from './command';

export class Ping extends Command {
  constructor() {
    super(
      'ping',
      'Replies with pong.',
      ApplicationCommandTypes.CHAT_INPUT,
      [{
        type: ApplicationCommandOptionTypes.NUMBER,
        name: 'pongs',
        description: 'number of pongs to send',
        required: true
      }]
    );
  }


  generateResponse(
    user: User,
    options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ) {
    return 'pong'.repeat(options.getNumber('pongs')!);
  }
}