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
