// Local Imports
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

export const Pog = new Command({
  name: 'pog',
  description: 'Replies with Champ.',
});