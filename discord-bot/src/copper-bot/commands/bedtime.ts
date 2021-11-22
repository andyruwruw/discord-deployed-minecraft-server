// Packages
import { Message } from 'discord.js';

// Local Imports
import { Command } from './command';

/**
 * Callback for the bedtime command which ends up the server if no one is online.
 *
 * @param {Message} message Orignal message for command.
 * @param {string[]} args Arguments passed for command
 */
const callback = (message: Message, args: string[]) => {
}

export const Bedtime = new Command(
  'bedtime',
  'Turns the server off the server if no one is online.',
  [],
  callback,
);
