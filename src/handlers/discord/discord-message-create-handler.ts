// Packages
import { Message } from 'discord.js';

// Local Imports
import { DiscordReferences } from '../../discord/discord-references';
import { DISCORD_CHANNEL } from '../../config/discord';
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

/**
 * Handles Discord messages.
 */
export class DiscordMessageCreateHandler extends Handler<Message> {
  /**
   * Handles the event.
   * 
   * @param {Message} payload Event payload.
   */
  async execute(payload: Message): Promise<void> {
    try {
      if (payload.author.bot) {
        return;
      }

      // Run as command if needed.
      const channel = await DiscordReferences.getChannel(DISCORD_CHANNEL.CONSOLE);

      if (channel
        && payload.channelId === channel.id) {
        Handler.Minecraft.runCommand(payload.content);
      }
    } catch (error) {
      await Monitor.trace(
        DiscordMessageCreateHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
