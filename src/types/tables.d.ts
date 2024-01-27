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

/**
 * Channel type.
 */
export type ChannelType = 'broadcast'
| 'console'
| 'bulletin-board'
| 'general'
| 'whitelist';

/**
 * Role type.
 */
export type RoleType = 'op'
| 'online'
| 'dirt'
| 'diamond'
| 'wood'
| 'stone'
| 'iron'
| 'gold'
| 'netherite'
| 'most-playtime'
| 'most-achievements'
| 'all-achievements'
| 'most-deaths';

/**
 * Assigned channel.
 */
export interface Channel {
  id: string;

  type: ChannelType;
}

/**
 * Assigned role.
 */
export interface Role {
  id: string;

  type: RoleType;
}
