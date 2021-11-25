// Local Imports
import { CacheType, CommandInteractionOptionResolver } from 'discord.js';
import { ApplicationCommandTypes } from 'discord.js/typings/enums';
import { Command } from './command';

// /**
//  * Callback for the wakeup command which starts up the server.
//  *
//  * @param {Message} message Orignal message for command.
//  * @param {string[]} args Arguments passed for command.
//  */
// const callback = (args: string[], message: Message) => {
// }

export class Pog extends Command {
  constructor() {
    super();
    super.setCommand( 
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