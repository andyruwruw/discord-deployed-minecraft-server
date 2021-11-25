// Packages

import { CacheType, CommandInteractionOptionResolver, Interaction, InteractionReplyOptions } from 'discord.js';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';

// Local Imports
import { Command } from './command';

// /**
//  * Callback for the wakeup command which starts up the server.
//  *
//  * @param {Message} message Orignal message for command.
//  * @param {string[]} args Arguments passed for command.
//  */
// const callback = (args: string[], message: Message) => {
// }

export class Ping extends Command {
  constructor() {
    super();
    super.setCommand(
      'ping',
      'Replies with pong.',
      undefined,
      [{
        type: ApplicationCommandOptionTypes.NUMBER,
        name: 'pongs',
        description: 'number of pongs to send',
        required: true
      }]
    );
    console.log(super.getCommand());
  }

  generateResponse(
    options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ) {
    return 'pong'.repeat(options.getNumber('pongs')!);
  }
}