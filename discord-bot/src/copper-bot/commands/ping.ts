// Packages
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

export const Ping = new Command({
  name: 'ping',
  description: 'Replies with pong.',
  options: [{
    type: ApplicationCommandOptionTypes.NUMBER,
    name: 'pongs',
    description: 'number of pongs to send',
    required: true
  }]
});