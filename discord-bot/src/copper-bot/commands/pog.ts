// Local Imports
import { CacheType, CommandInteractionOptionResolver } from 'discord.js';
import { ApplicationCommandTypes } from 'discord.js/typings/enums';
import { Command } from './command';

export class Pog extends Command {
  constructor() {
    super( 
      'pog',
      'Replies with Champ.',
    );
  }

  generateResponse(
    options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ) {
    return 'Champ';
  }
}