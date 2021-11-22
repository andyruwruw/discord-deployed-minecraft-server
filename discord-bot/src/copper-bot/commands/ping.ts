// Packages
import { Message } from 'discord.js';

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

export const Ping = new Command(
  'ping',
  'Replies with pong.',
);
