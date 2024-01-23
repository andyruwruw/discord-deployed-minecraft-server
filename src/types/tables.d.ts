/**
 * Database object for players.
 */
export interface Player {
  /**
   * Discord ID.
   */
  discord: string;

  /**
   * Minecraft ID.
   */
  minecraft: string;

  /**
   * Number of achievements.
   */
  achievements: number;

  /**
   * Number of deaths.
   */
  deaths: number;

  /**
   * Number of logins.
   */
  logins: number;

  /**
   * Number of hours.
   */
  hours: number;
}
