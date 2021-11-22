// Packages
import { Message } from 'discord.js';

// Local Imports
import { CommandList, Command } from '../copper-bot/commands';

/**
 * Returns command in message.
 * 
 * @param {Message} message Message in question.
 * @returns {Command | null} Command used if any.
 */
// export const getCommand = (message: Message): Command | null => {
//   for (let command of CommandList) {
//     if (command.isCommand(message)) {
//       return command;
//     }
//   }

//   return null;
// };
