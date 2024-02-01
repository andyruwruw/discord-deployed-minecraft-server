// Local Imports
import { DiscordReferences } from '../../discord/discord-references';
import { DISCORD_ROLE } from '../../config/discord';
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

// Types
import { MinecraftLoginEvent } from '../../types/minecraft';

/**
 * Handles a player logging in.
 */
export class PlayerLoginHandler extends Handler<MinecraftLoginEvent> {
  /**
   * Handles the event.
   * 
   * @param {MinecraftLoginEvent} payload Event payload.
   */
  async execute(payload: MinecraftLoginEvent): Promise<void> {
    try {
      const promises = [];

      promises.push(this._assignOnlineRole(payload.player));
      promises.push(this._updateLoginCount(payload.player));
      promises.push(this._createSession(payload.player));

      await Promise.all(promises);
    } catch (error) {
      await Monitor.trace(
        PlayerLoginHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Gives the logged in user the Online role.
   *
   * @param {string} username User's Minecraft username.
   */
  async _assignOnlineRole(username: string): Promise<void> {
    try {
      // Get Discord member.
      const member = await DiscordReferences.getPlayer(
        '',
        username,
      );

      // If we find that member.
      if (member) {
        // Get the Online role.
        const onlineRole = await DiscordReferences.getRole(DISCORD_ROLE.ONLINE);

        // Give them that online role.
        if (onlineRole) {
          await member.roles.add(onlineRole.id);
        }
      }
    } catch (error) {
      await Monitor.trace(
        PlayerLoginHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Increments the user's login count.
   *
   * @param {string} username User's Minecraft username.
   */
  async _updateLoginCount(username: string): Promise<void> {
    try {
      // Get the player's data.
      const player = await Handler.Database.players.findOne({
        minecraft: username,
      });

      // If available.
      if (player) {
        // Increment logins.
        await Handler.Database.players.update({
          minecraft: username,
        }, {
          logins: player.logins + 1,
        });
      }
    } catch (error) {
      await Monitor.trace(
        PlayerLoginHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Creates a new player session.
   *
   * @param {string} username Minecraft username. 
   */
  async _createSession(username: string): Promise<void> {
    try {
      // Get Discord member.
      const member = await DiscordReferences.getPlayer(
        '',
        username,
      );

      await Handler.Database.sessions.insert({
        discord: member ? member.id : 'unknown',
        minecraft: username,
        start: Date.now(),
      });
    } catch (error) {
      await Monitor.trace(
        PlayerLoginHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
