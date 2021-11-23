// Packages
import { ClientUser, Message } from 'discord.js';

// Local Imports
import { CopperBot } from '../copper-bot';

/**
 * Returns whether the Copper Bot was mentioned.
 *
 * @param {Message} message Message in question.
 * @param {CopperBot} client Bot client.
 * @returns {boolean} Whether the Copper Bot was mentioned
 */
export const isMention = (message: Message, client: CopperBot): boolean => {
  // Prevents bot from checking other bots or itself.
  if (message.author.bot) {
    return false;
  }

  // Prevents bot from listening to universal mentions.
  if (message.content.includes('@here') || message.content.includes('@everyone')) {
    return false;
  }

  return message.mentions.has((client.user as ClientUser).id);
}