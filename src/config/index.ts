// Types
import { RoleType } from '../types/tables';

/**
 * Database type enum.
 */
export const DATABASE_TYPE = {
  'MONGO': 'mongo',
  'MONGO_LOCAL': 'mongo-local',
  'CACHE': 'cache',
};

/**
 * Separates server consoles from Minecraft server.
 */
export const CONSOLE_DEFAULT_PREFIX = '[CopperBot Server]';

/**
 * How many hours per role.
 */
export const HOURS_PER_ROLE = {
  dirt: 0,
  wood: 2,
  stone: 4,
  iron: 8,
  gold: 16,
  diamond: 32,
  netherite: 64,
} as Record<RoleType, number>;

/**
 * Hours per roll as array.
 */
export const HOURS_PER_ROLE_ARRAY = [
  0,
  2,
  4,
  8,
  16,
  32,
  64,
] as number[];

/**
 * Hours per roll keys.
 */
export const HOURS_PER_ROLE_KEY_ARRAY = [
  'dirt',
  'wood',
  'stone',
  'iron',
  'gold',
  'diamond',
  'netherite',
] as RoleType[];

/**
 * Retrieves role for hours.
 *
 * @param {number} hours Number of hours. 
 */
export const getRoleForHours = (hours: number): RoleType => {
  let rank;
  for (let i = 0; i < HOURS_PER_ROLE_ARRAY.length; i += 1) {
    if (hours < HOURS_PER_ROLE_ARRAY[i]) {
      rank = i >= 0 ? HOURS_PER_ROLE_KEY_ARRAY[i - 1] : HOURS_PER_ROLE_KEY_ARRAY[0];
      break;
    } else if (i === HOURS_PER_ROLE_ARRAY.length - 1) {
      rank = HOURS_PER_ROLE_KEY_ARRAY[i];
    }
  }

  return rank as RoleType;
}

/**
 * Title for ranks.
 */
export const RANK_TITLES = {
  'dirt': 'Dirt',
  'wood': 'Wood',
  'stone': 'Stone',
  'iron': 'Iron',
  'gold': 'Gold',
  'diamond': 'Diamond',
  'netherite': 'Netherite',
} as Record<RoleType, string>;
