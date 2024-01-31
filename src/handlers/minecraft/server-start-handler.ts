// Local Imports
import { DISCORD_CHANNEL } from '../../config/discord';
import { SERVER_START } from '../../config/messages';
import { DatabaseReferences } from '../../database/database-references';
import { DiscordReferences } from '../../discord/discord-references';
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

/**
 * Handles the server starting.
 */
export class ServerStartHandler extends Handler<string> {
  /**
   * Handles the event.
   * 
   * @param {string} payload Event payload.
   */
  async execute(payload: string): Promise<void> {
    try {
      const settings = await DatabaseReferences.getServerSettings();

      if (!settings
        || !settings.broadcastServerStart) {
        return;
      }

      const broadcast = await DiscordReferences.getChannel(DISCORD_CHANNEL.BROADCAST);

      if (broadcast) {
        await broadcast.send({
          content: SERVER_START,
        });
      }
    } catch (error) {
      await Monitor.trace(
        ServerStartHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
