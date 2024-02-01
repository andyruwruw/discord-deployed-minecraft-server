/**
 * Rows tied to players.
 */
export interface PlayerItem {
  /**
   * Discord snowflake.
   */
  discord: string;

  /**
   * Minecraft username.
   */
  minecraft: string;
}

/**
 * Database object for players.
 */
export interface Player extends PlayerItem {
  /**
   * Time achievements was updated.
   */
  achievementUpdate: number;

  /**
   * Number of achievements.
   */
  achievements: number;

  /**
   * Number of deaths.
   */
  deaths: number;

  /**
   * Time death count was updated.
   */
  deathUpdate: number;

  /**
   * Number of logins.
   */
  logins: number;

  /**
   * Time hours was updated.
   */
  hoursUpdate: number;

  /**
   * Number of hours.
   */
  hours: number;
}

/**
 * Player logged achievement.
 */
export interface PlayerAchievement extends PlayerItem {
  /**
   * Achievement key.
   */
  achievement: string;

  /**
   * Date aquired.
   */
  updated: number;
}

/**
 * A user's login session.
 */
export interface Session extends PlayerItem {
  /**
   * Date time session began.
   */
  start: number;
}

/**
 * Database log of server settings.
 */
export interface ServerSettings {
  /**
   * Do players start with a starter kit.
   */
  starterKit: boolean;

  /**
   * What items do they start with.
   */
  starterKitItems: string[];

  /**
   * Can players set a home.
   */
  home: boolean;

  /**
   * Can players teleport to spawn and set a spawn.
   */
  spawn: boolean;

  /**
   * Can players warp.
   */
  warp: boolean;

  /**
   * Can players teleport to each other.
   */
  tpa: boolean;

  /**
   * Can players teleport back.
   */
  back: boolean;

  /**
   * Can players vote for day.
   */
  day: boolean;

  /**
   * Can players vote for night.
   */
  night: boolean;

  /**
   * Can players vote for weather.
   */
  weather: boolean;

  /**
   * Whether to broadcast console.
   */
  broadcastConsole: boolean;

  /**
   * Whether to broadcast logins.
   */
  broadcastLogin: boolean;

  /**
   * Whether to broadcast logout.
   */
  broadcastLogout: boolean;

  /**
   * Whether to broadcast chats.
   */
  broadcastChat: boolean;

  /**
   * Whether to broadcast achievements.
   */
  broadcastAchievement: boolean;

  /**
   * Whether to broadcast achievement overtakes.
   */
  broadcastAchievementOvertake: boolean;

  /**
   * Whether to broadcast playtime overtakes.
   */
  broadcastPlaytimeOvertake: boolean;

  /**
   * Whether to broadcast deaths.
   */
  broadcastDeath: boolean;

  /**
   * Whether to broadcast death overtakes.
   */
  broadcastDeathOvertake: boolean;

  /**
   * Whether to broadcast server start.
   */
  broadcastServerStart: boolean;

  /**
   * Whether to broadcast server restarts.
   */
  broadcastServerRestart: boolean;

  /**
   * How much memory to allocate in GB.
   */
  serverMemory: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  useG1GC: boolean;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  useParallelRefProc: boolean;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  maxGCPauseMillis: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  useExperimentalVMOptions: boolean;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  useExplicitGC: boolean;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  alwaysPreferTouch: boolean;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  g1NewSizePercent: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  g1MaxNewSizePercent: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  g1HeapRegionSize: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  g1ReservePercent: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  g1HeapWastePercent: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  g1MixedGCCountTarget: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  initiatingHeapOccupancyPercent: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  g1MixedGCLiveThresholdPercent: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  g1RSetUpdatingPauseTimePercent: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  survivorRatio: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  perfSharedMem: boolean;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  maxTenuringThreshold: number;

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   */
  useAikarsFlags: boolean;

  /**
   * Allows users to use flight on the server while in Survival mode
   */
  allowFlight: boolean;

  /**
   * Allows players to travel to the Nether.
   */
  allowNether: boolean;

  /**
   * Send console command outputs to all online operators.
   */
  broadcastConsoleToOps: boolean;

  /**
   * Send rcon console command outputs to all online operators.
   */
  broadcastRconToOps: boolean;

  /**
   * Defines the difficulty (such as damage dealt by mobs and the way hunger and poison affects players) of the server.
   */
  difficulty: MinecraftDifficulty;

  /**
   * Enables command blocks
   */
  enableCommandBlock: boolean;

  /**
   * Exposes an MBean with the Object name net.minecraft.server:type=Server and two attributes averageTickTime and tickTimes exposing the tick times in milliseconds.
   */
  enableJmxMonitoring: boolean;

  /**
   * Enables GameSpy4 protocol server listener. Used to get information about server.
   */
  enableQuery: boolean;

  /**
   * Enables remote access to the server console.
   */
  enableRcon: boolean;

  /**
   * Makes the server appear as "online" on the server list.
   */
  enableStatus: boolean;

  /**
   * If set to boolean, players without a Mojang-signed public key will not be able to connect to the server.
   */
  enforceSecureProfile: boolean;

  /**
   * Enforces the whitelist on the server.
   */
  enforceWhitelist: boolean;

  /**
   * Controls how close entities need to be before being sent to clients. Higher values means they'll be rendered from farther away, potentially causing more lag. This is expressed the percentage of the default value. For example, setting to 50 will make it half as usual.
   */
  entityBroadcastRangePercentage: number;

  /**
   * Force players to join in the default game mode.
   */
  forceGamemode: boolean;

  /**
   * Sets the default permission level for functions.
   */
  functionPermissionLevel: number;

  /**
   * Defines the mode of gameplay.
   */
  gamemode: MinecraftGamemode;

  /**
   * Defines whether structures (such as villages) can be generated.
   */
  generateStructures: boolean;

  /**
   * The settings used to customize world generation. Follow its format and write the corresponding JSON string. Remember to escape all : with \:.
   */
  generatorSettings: Dictionary<any>;
  
  /**
   * If set to boolean, server difficulty is ignored and set to hard and players are set to spectator mode if they die.
   */
  hardcore: boolean;
  
  /**
   * If set to boolean, a player list is not sent on status requests.
   */
  hideOnlinePlayers: boolean;
  
  /**
   * Comma-separated list of datapacks to not be auto-enabled on world creation.
   */
  initialDisabledPacks: string;
  
  /**
   * Comma-separated list of datapacks to be enabled during world creation. Feature packs need to be explicitly enabled.
   */
  initialEnabledPacks: string;
  
  /**
   * The "level-name" value is used as the world name and its folder name. The player may also copy their saved game folder here, and change the name to the same as that folder's to load it instead.
   */
  levelName: string;
  
  /**
   * 	Sets a world seed for the player's world, as in Singleplayer. The world generates with a random seed if left blank.
   */
  levelSeed: number;
  
  /**
   * Determines the world preset that is generated. Escaping ":" is required when using a world preset ID, and the vanilla world preset ID's namespace (minecraft:) can be omitted.
   */
  levelType: MinecraftLevelType;
  
  /**
   * Whether to log IPs.
   */
  logIps: boolean;
  
  /**
   * Limiting the amount of consecutive neighbor updates before skipping additional ones. Negative values remove the limit.
   */
  maxChainedNeighborUpdates: number;
  
  /**
   * The maximum number of players that can play on the server at the same time.
   */
  maxPlayers: number;
  
  /**
   * The maximum number of milliseconds a single tick may take before the server watchdog stops the server with the message.
   */
  maxTickTime: number;
  
  /**
   * This sets the maximum possible size in blocks, expressed as a radius, that the world border can obtain.
   */
  maxWorldSize: number;
  
  /**
   * This is the message that is displayed in the server list of the client, below the name.
   */
  motd: string[];
  
  /**
   * By default it allows packets that are n-1 bytes big to go normally, but a packet of n bytes or more gets compressed down.
   */
  networkCompressionThreshold: number;
  
  /**
   * Server checks connecting players against Minecraft account database. Set this to boolean only if the player's server is not connected to the Internet.
   */
  onlineMode: boolean;
  
  /**
   * Sets the default permission level for ops when using /op.
   */
  opPermissionLevel: number;
  
  /**
   * If non-zero, players are kicked from the server if they are idle for more than that many minutes.
   */
  playerIdleTimeout: number;
  
  /**
   * If the ISP/AS sent from the server is different from the one from Mojang Studios' authentication server, the player is kicked.
   */
  preventProxyConnections: boolean;
  
  /**
   * Enable PvP on the server. Players shooting themselves with arrows receive damage only if PvP is enabled.
   */
  pvp: boolean;
  
  /**
   * Sets the port for the query server (see enable-query).
   */
  queryPort: number;
  
  /**
   * Sets the maximum amount of packets a user can send before getting kicked. Setting to 0 disables this feature.
   */
  rateLimit: number;
  
  /**
   * Sets the password for RCON: a remote console protocol that can allow other applications to connect and interact with a Minecraft server over the internet.
   */
  rconPassword: string;
  
  /**
   * Sets the RCON network port.
   */
  rconPort: number;
  
  /**
   * When this option is enabled (set to boolean), players will be prompted for a response and will be disconnected if they decline the required pack.
   */
  requireResourcePack: boolean;
  
  /**
   * Optional URI to a resource pack. The player may choose to use it.
   */
  resourcePack: string;
  
  /**
   * Unknown.
   */
  resourcePackId: string;
  
  /**
   * Optional, adds a custom message to be shown on resource pack prompt when require-resource-pack is used.
   */
  resourcePackPrompt: string;
  
  /**
   * Optional SHA-1 digest of the resource pack, in lowercase hexadecimal.
   */
  resourcePackSha1: string;
  
  /**
   * The player should set this if they want the server to bind to a particular IP. It is strongly recommended that the player leaves server-ip blank.
   */
  serverIp: string;
  
  /**
   * Changes the port the server is hosting (listening) on. This port must be forwarded if the server is hosted in a network using NAT (if the player has a home router/firewall).
   */
  serverPort: number;
  
  /**
   * Sets the maximum distance from players that living entities may be located in order to be updated by the server, measured in chunks in each direction of the player (radius, not diameter).
   */
  simulationDistance: number;
  
  /**
   * Determines if animals can spawn.
   */
  spawnAnimals: boolean;
  
  /**
   * Determines if monsters can spawn.
   */
  spawnMonsters: boolean;
  
  /**
   * Determines whether villagers can spawn.
   */
  spawnNpcs: boolean;
  
  /**
   * Determines the side length of the square spawn protection area as 2x+1. 
   */
  spawnProtection: number;
  
  /**
   * Enables synchronous chunk writes.
   */
  syncChunkWrites: boolean;
  
  /**
   * Unknown.
   */
  textFilteringConfig: string;
  
  /**
   * Linux server performance improvements: optimized packet sending/receiving on Linux.
   */
  useNativeTransport: boolean;
  
  /**
   * Sets the amount of world data the server sends the client, measured in chunks in each direction of the player (radius, not diameter). It determines the server-side viewing distance.
   */
  viewDistance: number;
  
  /**
   * Enables a whitelist on the server.
   */
  whiteList: boolean;
}

/**
 * General Discord references.
 */
export interface DiscordReference {
  /**
   * Discord ID for item.
   */
  id: string;
}

/**
 * Assigned channel.
 */
export interface Channel extends DiscordReference {
  /**
   * Channel assignment.
   */
  type: ChannelType;
}

/**
 * Assigned role.
 */
export interface Role extends DiscordReference {
  /**
   * Role assignment.
   */
  type: RoleType;
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
 * Rank roles.
 */
export type RankRoleType = 'dirt'
| 'diamond'
| 'wood'
| 'stone'
| 'iron'
| 'gold'
| 'netherite';

/**
 * Role type.
 */
export type RoleType = RankRoleType
| 'op'
| 'online'
| 'most-playtime'
| 'most-achievements'
| 'all-achievements'
| 'most-deaths';
