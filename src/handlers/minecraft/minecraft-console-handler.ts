// Packages
import { TextChannel } from 'discord.js';

// Local Imports
import {
  DEATH_MESSAGE,
  DEATH_MESSAGE_KEYS,
  EULA_ERROR_CONSOLE,
  NOT_PLAYER_MESSAGE,
} from '../../config/minecraft';
import { DiscordReferences } from '../../discord/discord-references';
import { EulaErrorHandler, PlayerDeathHandler } from '..';
import { DISCORD_CHANNEL } from '../../config/discord';
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

/**
 * Handles the console sending a message.
 */
export class MinecraftConsoleHandler extends Handler<string> {
  /**
   * Handles the event.
   * 
   * @param {string} payload Event payload.
   */
  async execute(payload: string): Promise<void> {
    try {
      // Is it empty?
      if (!payload.length) {
        return;
      }

      // EULA error?
      if (payload.match(EULA_ERROR_CONSOLE) !== null) {
        await EulaErrorHandler.execute(payload);
      }

      // Death message?
      if (NOT_PLAYER_MESSAGE.test(payload)
        && DEATH_MESSAGE.test(payload)) {
        await this._deathMessage(payload);
      }

      // Get console channel.
      const channel = await DiscordReferences.getChannel(DISCORD_CHANNEL.CONSOLE);
  
      // If the channel is available.
      if (channel) {
        // Send payload.
        (channel as TextChannel).send({
          content: payload,
        });
      }
    } catch (error) {
      await Monitor.trace(
        MinecraftConsoleHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Handles death messages.
   * 
   * @param {string} message Message in question.
   */
  async _deathMessage(message: string): Promise<void> {
    try {
      const match = message.match(DEATH_MESSAGE);

      if (match) {
        await PlayerDeathHandler.execute({
          player: match[DEATH_MESSAGE_KEYS.PLAYER],
          death: match[DEATH_MESSAGE_KEYS.DEATH_MESSAGE],
        });
      }
    } catch (error) {
      await Monitor.trace(
        MinecraftConsoleHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
