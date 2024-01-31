// Local Imports
import {
  ACHIEVEMENT_BROADCAST,
  ACHIEVEMENT_LEADBOARD_BROADCAST,
} from '../../config/messages';
import {
  DISCORD_CHANNEL,
  DISCORD_ROLE,
} from '../../config/discord';
import { DatabaseReferences } from '../../database/database-references';
import { DiscordReferences } from '../../discord/discord-references';
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

// Types
import { MinecraftAchievementEvent } from '../../types/minecraft';

/**
 * Handles a player getting an achievement.
 */
export class PlayerAchievementHandler extends Handler<MinecraftAchievementEvent> {
  /**
   * Handles the event.
   * 
   * @param {MinecraftAchievementEvent} payload Event payload.
   */
  async execute(payload: MinecraftAchievementEvent): Promise<void> {
    try {
      await this._logAchievement(
        payload.player,
        payload.achievement,
      );

      await this._logLeaderboard(payload.player);
    } catch (error) {
      await Monitor.trace(
        PlayerAchievementHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Logs achievement with database.
   *
   * @param {string} username Minecraft username. 
   * @param {string} achievement Achievement string.
   */
  async _logAchievement(
    username: string,
    achievement: string,
  ): Promise<void> {
    try {
      // Increment achievements.
      await Handler.Database.players.update({
        minecraft: username,
      }, {
        $inc: {
          achievements: 1,
        },
        achievementUpdate: Date.now(),
      });

      // Get Discord member.
      const member = await DiscordReferences.getPlayer(
        '',
        username,
      );

      // log achievement.
      await Handler.Database.playerAchievements.insert({
        discord: member ? member.id : 'unknown',
        minecraft: username,
        achievement,
        updated: Date.now(),
      });

      const settings = await DatabaseReferences.getServerSettings();

      if (settings
        && settings.broadcastAchievement) {
        const broadcast = await DiscordReferences.getChannel(DISCORD_CHANNEL.BROADCAST);

        if (broadcast) {
          await broadcast.send({
            content: ACHIEVEMENT_BROADCAST(
              username,
              achievement,
            ),
          });
        }
      }
    } catch (error) {
      await Monitor.trace(
        PlayerAchievementHandler,
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
      if (!(await DatabaseReferences.shouldUpdateAchievementsLeaderboard(
        username,
        player.achievements,
      ))) {
        return;
      }

      // Get the leaderboard and rank.
      const leaderboard = await DatabaseReferences.updateAchievementLeaderboard();
      const topRank = await DiscordReferences.getRole(DISCORD_ROLE.MOST_ACHIEVEMENTS);

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
        || !settings.broadcastAchievementOvertake) {
        return;
      }

      const broadcast = await DiscordReferences.getChannel(DISCORD_CHANNEL.BROADCAST);

      if (broadcast) {
        await broadcast.send({
          content: ACHIEVEMENT_LEADBOARD_BROADCAST(leaderboard),
        });
      }
    } catch (error) {
      await Monitor.trace(
        PlayerAchievementHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
