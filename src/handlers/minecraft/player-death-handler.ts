// Local Imports
import {
  DISCORD_CHANNEL,
  DISCORD_ROLE,
} from '../../config/discord';
import { DEATHS_LEADBOARD_BROADCAST } from '../../config/messages';
import { DatabaseReferences } from '../../database/database-references';
import { DiscordReferences } from '../../discord/discord-references';
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

// Types
import { MinecraftDeathEvent } from '../../types/minecraft';

/**
 * Handles a player dying.
 */
export class PlayerDeathHandler extends Handler<MinecraftDeathEvent> {
  /**
   * Handles the event.
   * 
   * @param {MinecraftDeathEvent} payload Event payload.
   */
  async execute(payload: MinecraftDeathEvent): Promise<void> {
    try {
      await this._logDeath(
        payload.player,
        payload.death,
      );

      await this._logLeaderboard(payload.player);
    } catch (error) {
      await Monitor.trace(
        PlayerDeathHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Logs death.
   *
   * @param {string} username Minecraft username. 
   * @param {string} death Death string.
   */
  async _logDeath(
    username: string,
    death: string,
  ): Promise<void> {
    try {
      // Increment deaths.
      await Handler.Database.players.update({
        minecraft: username,
      }, {
        $inc: {
          deaths: 1,
        },
        deathUpdate: Date.now(),
      });

      const settings = await DatabaseReferences.getServerSettings();

      if (settings
        && settings.broadcastDeath) {
        const broadcast = await DiscordReferences.getChannel(DISCORD_CHANNEL.BROADCAST);

        if (broadcast) {
          await broadcast.send({
            content: death,
          });
        }
      }
    } catch (error) {
      await Monitor.trace(
        PlayerDeathHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Broadcasts leaderboard if needed.
   * 
   * @param {string} username Minecraft username.
   */
  async _logLeaderboard(username: string): Promise<void> {
    try {
      // Get the player's database item.
      const player = await Handler.Database.players.findOne({
        minecraft: username,
      });

      // Did the leaderboard change?
      if (!(await DatabaseReferences.shouldUpdateDeathsLeaderboard(
        username,
        player.deaths,
      ))) {
        return;
      }

      // Get the leaderboard and rank.
      const leaderboard = await DatabaseReferences.updateDeathLeaderboard();
      const topRank = await DiscordReferences.getRole(DISCORD_ROLE.MOST_DEATHS);

      if (topRank) {
        // Take top rank away from all but first.
        if (leaderboard.length > 1) {
          const promises = [];

          // For all other leaderboard members.
          for (let i = 1; i < leaderboard.length; i += 1) {
            const member = await DiscordReferences.getPlayer(
              '',
              leaderboard[i].minecraft,
            );

            if (member) {
              // Remove top role.
              promises.push(member.roles.remove(topRank.id));
            }
          }

          await Promise.all(promises);
        }

        // Give top rank to first.
        if (leaderboard.length > 0) {
          // For the top player.
          const topMember = await DiscordReferences.getPlayer(
            '',
            leaderboard[0].minecraft,
          );

          if (topMember) {
            // Give them the top rank.
            await topMember.roles.add(topRank.id);
          }
        }
      }

      // Get our settings and check if we broadcast leaderboard overtakes.
      const settings = await DatabaseReferences.getServerSettings();
      if (!settings
        || !settings.broadcastDeathOvertake) {
        return;
      }

      const broadcast = await DiscordReferences.getChannel(DISCORD_CHANNEL.BROADCAST);

      if (broadcast) {
        await broadcast.send({
          content: DEATHS_LEADBOARD_BROADCAST(leaderboard),
        });
      }
    } catch (error) {
      await Monitor.trace(
        PlayerDeathHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
