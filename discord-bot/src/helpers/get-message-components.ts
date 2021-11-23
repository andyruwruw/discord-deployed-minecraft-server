// Packages
import { Message } from 'discord.js';

/**
 * Breaks message apart into command parameters.
 *
 * @param {Message} message Message in question.
 * @returns {MessageComponents} Object containing command key and parameters.
 */
export const getMessageComponents = (message: Message): MessageComponents => {
  const [
    mention,
    key,
    ...args
  ] = message.content.split(' ');

  return {
    mention,
    key: key.toLowerCase(),
    args: args.map(arg => arg.toLowerCase()),
  };
};
