// Local Imports
import { ServerProperties } from '../minecraft/properties';
import { Monitor } from '../helpers/monitor';
import { Server } from '..';

// Types
import {
  Player,
  ServerSettings,
} from '../types/tables';

/**
 * Static references to Database items.
 */
export class DatabaseReferences {
  /**
   * Static references to players with most playtime.
   */
  static MostPlaytime = [] as Player[];

  /**
   * Static references to players with most achievements.
   */
  static MostAchievements = [] as Player[];

  /**
   * Static references to players with most deaths.
   */
  static MostDeaths = [] as Player[];

  /**
   * Static reference to server settings.
   */
  static Settings = null as ServerSettings | null;

  /**
   * Retrieves server settings.
   * 
   * @returns {Promise<ServerSettings>} Server settings.
   */
  static async getServerSettings(): Promise<ServerSettings | null> {
    try {
      if (!DatabaseReferences.Settings) {
        let settings = await Server.Database.settings.findOne({});

        if (!settings) {
          await Server.Database.settings.insert(ServerProperties.Export());

          settings = await Server.Database.settings.findOne({});
        }

        DatabaseReferences.Settings = settings;
      }
    } catch (error) {
      await Monitor.trace(
        DatabaseReferences,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
    return DatabaseReferences.Settings
  }

  /**
   * Checks if the leaderboard changes.
   *
   * @param {string} username User that just changed. 
   * @param {number} hours Their hours played. 
   * @returns {Promise<boolean>} Whether the leadboard should be updated.
   */
  static async shouldUpdatePlaytimeLeaderboard(
    username: string,
    hours: number,
  ): Promise<boolean> {
    try {
      if (!DatabaseReferences.MostPlaytime.length
        || DatabaseReferences.MostPlaytime.length < 3) {
        return true;
      }

      const usernames = DatabaseReferences.MostPlaytime.map((player: Player) => (player.minecraft));

      if (hours < DatabaseReferences.MostPlaytime[2].hours
        && usernames.includes(username)) {
        return true;
      }

      if (hours > DatabaseReferences.MostPlaytime[2].hours
        && !usernames.includes(username)) {
        return true;
      }

      const index = usernames.indexOf(username);

      if (index !== -1) {
        for (let i = index - 1; i >= 0; i -= 1) {
          if (DatabaseReferences.MostPlaytime[i].hours < DatabaseReferences.MostPlaytime[index].hours) {
            return true;
          }
        }
        
        await DatabaseReferences.updatePlaytimeLeaderboard();
      }
    } catch (error) {
      await Monitor.trace(
        DatabaseReferences,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
    return false;
  }

  /**
   * Checks if the leaderboard changes.
   *
   * @param {string} username User that just changed. 
   * @param {number} hours Their hours played. 
   * @returns {Promise<boolean>} Whether the leadboard should be updated.
   */
  static async shouldUpdateAchievementsLeaderboard(
    username: string,
    achievements: number,
  ): Promise<boolean> {
    try {
      if (!DatabaseReferences.MostAchievements.length
        || DatabaseReferences.MostAchievements.length < 3) {
        return true;
      }

      const usernames = DatabaseReferences.MostAchievements.map((player: Player) => (player.minecraft));

      if (achievements < DatabaseReferences.MostAchievements[2].achievements
        && usernames.includes(username)) {
        return true;
      }

      if (achievements > DatabaseReferences.MostAchievements[2].achievements
        && !usernames.includes(username)) {
        return true;
      }

      const index = usernames.indexOf(username);

      if (index !== -1) {
        for (let i = index - 1; i >= 0; i -= 1) {
          if (DatabaseReferences.MostAchievements[i].achievements < DatabaseReferences.MostAchievements[index].achievements) {
            return true;
          }
        }

        await DatabaseReferences.updateAchievementLeaderboard();
      }
    } catch (error) {
      await Monitor.trace(
        DatabaseReferences,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
    return false;
  }

  /**
   * Checks if the leaderboard changes.
   *
   * @param {string} username User that just changed. 
   * @param {number} hours Their hours played. 
   * @returns {Promise<boolean>} Whether the leadboard should be updated.
   */
  static async shouldUpdateDeathsLeaderboard(
    username: string,
    deaths: number,
  ): Promise<boolean> {
    try {
      if (!DatabaseReferences.MostDeaths.length
        || DatabaseReferences.MostDeaths.length < 3) {
        return true;
      }

      const usernames = DatabaseReferences.MostDeaths.map((player: Player) => (player.minecraft));

      if (deaths < DatabaseReferences.MostDeaths[2].deaths
        && usernames.includes(username)) {
        return true;
      }

      if (deaths > DatabaseReferences.MostDeaths[2].deaths
        && !usernames.includes(username)) {
        return true;
      }

      const index = usernames.indexOf(username);

      if (index !== -1) {
        for (let i = index - 1; i >= 0; i -= 1) {
          if (DatabaseReferences.MostDeaths[i].deaths < DatabaseReferences.MostDeaths[index].deaths) {
            return true;
          }
        }

        await DatabaseReferences.updateDeathLeaderboard();
      }
    } catch (error) {
      await Monitor.trace(
        DatabaseReferences,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
    return false;
  }

  /**
   * Updates playtime leaderboard.
   *
   * @returns {Promise<Player[]>} Leaderboard.
   */
  static async updatePlaytimeLeaderboard(): Promise<Player[]> {
    let players = [] as Player[];

    try {
      const leaderboard = await Server.Database.players.find(
        {},
        {},
        {
          hours: -1,
          hoursUpdate: 1,
        },
        0,
        3,
      );

      if (leaderboard.length) {
        DatabaseReferences.MostPlaytime = leaderboard;
        players.push(...leaderboard);
      }
    } catch (error) {
      await Monitor.trace(
        DatabaseReferences,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }

    return players;
  }

  /**
   * Updates achievement leaderboard.
   *
   * @returns {Promise<Player[]>} Leaderboard.
   */
  static async updateAchievementLeaderboard(): Promise<Player[]> {
    let players = [] as Player[];

    try {
      const leaderboard = await Server.Database.players.find(
        {},
        {},
        {
          achievements: -1,
          achievementUpdate: 1,
        },
        0,
        3,
      );

      if (leaderboard.length) {
        DatabaseReferences.MostAchievements = leaderboard;
        players.push(...leaderboard);
      }
    } catch (error) {
      await Monitor.trace(
        DatabaseReferences,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }

    return players;
  }

  /**
   * Updates death leaderboard.
   *
   * @returns {Promise<Player[]>} Leaderboard.
   */
  static async updateDeathLeaderboard(): Promise<Player[]> {
    let players = [] as Player[];

    try {
      const leaderboard = await Server.Database.players.find(
        {},
        {},
        {
          deaths: -1,
          deathUpdate: 1,
        },
        0,
        3,
      );

      if (leaderboard.length) {
        DatabaseReferences.MostDeaths = leaderboard;
        players.push(...leaderboard);
      }
    } catch (error) {
      await Monitor.trace(
        DatabaseReferences,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }

    return players;
  }
}
