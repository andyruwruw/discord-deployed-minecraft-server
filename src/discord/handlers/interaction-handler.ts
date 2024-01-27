// Packages
import { Interaction } from 'discord.js';

// Local Imports
import { Handler } from './handler';
import { CommandManager } from '../commands';

/**
 * Handles Discord bot interactions.
 */
export class InteractionHandler extends Handler<Interaction> {
  /**
   * Handles the event.
   */
  async execute(interaction: Interaction) {
    try {
      await CommandManager.handleInteraction(interaction);
    } catch (error) {
      console.log(error);
    }
  }
}
