// Local Imports
import { CacheType, CommandInteractionOptionResolver, User } from 'discord.js';
import { Command } from './command';

export class Pog extends Command {
  constructor() {
    super( 
      'pog',
      'Replies with Champ.',
    );
  }

  generateResponse(
    user: User,
    options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ) {
    return 'Champ';
  }
}