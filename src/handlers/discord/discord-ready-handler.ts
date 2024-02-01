// Packages
import { Client } from 'discord.js';

// Local Imports
import {
  MESSAGE_INVITE_LINK,
  MESSAGE_READY,
} from '../../config/messages';
import { CommandManager } from '../../discord/commands';
import { Environment } from '../../helpers/environment';
import { INVITE_LINK } from '../../config/discord';
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';
import { Server } from '../..';

/**
 * Handles Discord bot ready.
 */
export class DiscordReadyHandler extends Handler<Client> {
  /**
   * Handles the event.
   * 
   * @param {Client} payload Event payload.
   */
  async execute(payload: Client): Promise<void> {
    try {
      Monitor.log(
        DiscordReadyHandler,
        MESSAGE_READY,
        Monitor.Layer.UPDATE,
      );

      Monitor.log(
        DiscordReadyHandler,
        MESSAGE_INVITE_LINK(INVITE_LINK(Environment.getDiscordApplicationId())),
        Monitor.Layer.UPDATE,
      );
  
      // Register slash commands.
      CommandManager.instantiateCommands();
      await CommandManager.registerCommands(Server.Discord);
    } catch (error) {
      await Monitor.trace(
        DiscordReadyHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
