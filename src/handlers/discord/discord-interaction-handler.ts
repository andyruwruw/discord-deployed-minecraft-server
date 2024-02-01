// Packages
import { Interaction } from 'discord.js';

// Local Imports
import { CommandManager } from '../../discord/commands';
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

/**
 * Handles Discord interactions.
 */
export class DiscordInteractionHandler extends Handler<Interaction> {
  /**
   * Handles the event.
   * 
   * @param {Interaction} payload Event payload.
   */
  async execute(payload: Interaction): Promise<void> {
    try {
      await CommandManager.handleInteraction(payload);
    } catch (error) {
      await Monitor.trace(
        DiscordInteractionHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
