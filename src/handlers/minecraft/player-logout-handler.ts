// Local Imports
import {
  DISCORD_CHANNEL,
  DISCORD_ROLE,
} from '../../config/discord';
import { PLAYTIME_LEADBOARD_BROADCAST } from '../../config/messages';
import { DatabaseReferences } from '../../database/database-references';
import { DiscordReferences } from '../../discord/discord-references';
import { getRankForHours } from '../../helpers/ranks';
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

// Types
import { MinecraftLogoutEvent } from '../../types/minecraft';

/**
 * Handles a player logging out.
 */
export class PlayerLogoutHandler extends Handler<MinecraftLogoutEvent> {
  /**
   * Handles the event.
   * 
   * @param {MinecraftLogoutEvent} payload Event payload.
   */
  async execute(payload: MinecraftLogoutEvent): Promise<void> {
    try {
      const promises = [];

      promises.push(this._assignOnlineRole(payload.player));
      promises.push(this._endSession(payload.player));

      await Promise.all(promises);
    } catch (error) {
      await Monitor.trace(
        PlayerLogoutHandler,
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
          await member.roles.remove(onlineRole.id);
        }
      }
    } catch (error) {
      await Monitor.trace(
        PlayerLogoutHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Ends a new player session.
   *
   * @param {string} username Minecraft username. 
   */
  async _endSession(username: string): Promise<void> {
    try {
      // Get the player and their session.
      const player = await Handler.Database.players.findOne({
        minecraft: username,
      });
      const session = await Handler.Database.sessions.findOne({
        minecraft: username,
      });

      if (session) {
        // Delete that session.
        const remove = Handler.Database.sessions.delete({
          minecraft: username,
        });

        // How long were they playing.
        const duration = (Date.now() - session.start) / 1000 / 60 / 60;

        // Update their hours.
        await Handler.Database.players.update({
          minecraft: username,
        }, {
          hours: player.hours + duration,
          hoursUpdate: Date.now(),
        });

        // Log leaderboards and new rank.
        await this._logLeaderboard(
          username,
          player.hours + duration,
        );
        await this._alterRank(
          username,
          player.hours,
          player.hours + duration,
        );

        await remove;
      }
    } catch (error) {
      await Monitor.trace(
        PlayerLogoutHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Broadcasts leaderboard if needed.
   * 
   * @param {string} username Minecraft username.
   * @param {number} hours Hours played.
   */
  async _logLeaderboard(
    username: string,
    hours: number,
  ): Promise<void> {
    try {
      // Did the leaderboard change?
      if (!(await DatabaseReferences.shouldUpdateAchievementsLeaderboard(
        username,
        hours,
      ))) {
        return;
      }

      // Get the leaderboard and rank.
      const leaderboard = await DatabaseReferences.updateAchievementLeaderboard();
      const topRank = await DiscordReferences.getRole(DISCORD_ROLE.MOST_PLAYTIME);

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
        || !settings.broadcastPlaytimeOvertake) {
        return;
      }

      const broadcast = await DiscordReferences.getChannel(DISCORD_CHANNEL.BROADCAST);

      if (broadcast) {
        await broadcast.send({
          content: PLAYTIME_LEADBOARD_BROADCAST(leaderboard),
        });
      }
    } catch (error) {
      await Monitor.trace(
        PlayerLogoutHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Gives the user a new rank.
   *
   * @param {string} username Username.
   * @param {number} previous Previous hours.
   * @param {number} current Current hours.
   */
  async _alterRank(
    username: string,
    previous: number,
    current: number,
  ): Promise<void> {
    try {
      const previousRankData = getRankForHours(previous);
      const currentRankData = getRankForHours(current);

      if (previousRankData.id !== currentRankData.id) {
        const member = await DiscordReferences.getPlayer(
          '',
          username,
        );

        if (member) {
          const previousRank = await DiscordReferences.getRole(previousRankData.id);

          if (previousRank) {
            await member.roles.remove(previousRank.id);
          }

          const currentRank = await DiscordReferences.getRole(currentRankData.id);

          if (currentRank) {
            await member.roles.add(currentRank.id);
          }
        }
      }
    } catch (error) {
      await Monitor.trace(
        PlayerLogoutHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
