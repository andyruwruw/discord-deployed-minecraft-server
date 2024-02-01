// Packages
import { Message } from 'discord.js';

// Local Imports
import { Handler } from './handler';
import { Server } from '../..';

/**
 * Handles Discord bot messages.
 */
export class MessageCreateHandler extends Handler<Message> {
  /**
   * Handles the event.
   */
  async execute(message: Message) {
    try {
      if (message.author.bot) {
        return;
      }

      const consoleChannel = await Server.Database.channels.findOne({
        type: 'console',
      });

      if (consoleChannel
        && message.channelId === consoleChannel.id) {
        Server.Minecraft.runCommand(message.content);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
