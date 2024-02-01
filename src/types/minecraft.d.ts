/**
 * Defines the difficulty (such as damage dealt by mobs and the way hunger and poison affects players) of the server.
 */
export type MinecraftDifficulty = 'peaceful'
| 'easy'
| 'normal'
| 'hard';

/**
 * Gamemode for game.
 */
export type MinecraftGamemode = 'survival'
| 'creative'
| 'adventure'
| 'spectator';

/**
 * Types of generation.
 */
export type MinecraftLevelType = 'minecraft\:normal'
| 'minecraft\:flat'
| 'minecraft\:large_biomes'
| 'minecraft\:amplified'
| 'minecraft\:single_biome_surface';

/**
 * Minecraft events relating to a player.
 */
export interface MinecraftPlayerEvent {
  /**
   * Player this event is about.
   */
  player: string;
}

/**
 * Minecraft event for a player sending a message.
 */
export interface MinecraftChatEvent extends MinecraftPlayerEvent {
  /**
   * Message sent.
   */
  message: string;
}

/**
 * Minecraft event for a player logging in.
 */
export interface MinecraftLoginEvent extends MinecraftPlayerEvent {
  /**
   * Player's IP address.
   */
  ip: string;
}

/**
 * Minecraft event for a player logging out.
 */
export interface MinecraftLogoutEvent extends MinecraftPlayerEvent {
  /**
   * Reason for logout.
   */
  reason: string;
}

/**
 * Minecraft event for a player getting an achievement.
 */
export interface MinecraftAchievementEvent extends MinecraftPlayerEvent {
  /**
   * Achievement gained.
   */
  achievement: string;
}

export interface MinecraftDeathEvent extends MinecraftPlayerEvent {
  /**
   * How they died including their name.
   */
  death: string;
}
