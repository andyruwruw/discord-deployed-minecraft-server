// Packages
import {
  Config,
  DeepPartial
} from '@scriptserver/core';

// Local Imports
import {
  RCON_HOST,
  SERVER_PROPERTY_ALLOW_FLIGHT,
  SERVER_PROPERTY_ALLOW_NETHER,
  SERVER_PROPERTY_BROADCAST_CONSOLE_TO_OPS,
  SERVER_PROPERTY_BROADCAST_RCON_TO_OPS,
  SERVER_PROPERTY_DIFFICULTY,
  SERVER_PROPERTY_ENABLE_COMMAND_BLOCK,
  SERVER_PROPERTY_ENABLE_JMX_MONITORING,
  SERVER_PROPERTY_ENABLE_QUERY,
  SERVER_PROPERTY_ENABLE_RCON,
  SERVER_PROPERTY_ENABLE_STATUS,
  SERVER_PROPERTY_FORCE_GAMEMODE,
  SERVER_PROPERTY_ENFORCE_SECURE_PROFILE,
  SERVER_PROPERTY_ENFORCE_WHITE_LIST,
  SERVER_PROPERTY_ENTITY_BROADCAST_RANGE_PERCENTAGE,
  SERVER_PROPERTY_FUNCTION_PERMISSION_LEVEL,
  SERVER_PROPERTY_GAMEMODE,
  SERVER_PROPERTY_GENERATE_STRUCTURES,
  SERVER_PROPERTY_GENERATOR_SETTINGS,
  SERVER_PROPERTY_HARDCORE,
  SERVER_PROPERTY_HIDE_ONLINE_PLAYERS,
  SERVER_PROPERTY_INITIAL_DISABLED_PACKS,
  SERVER_PROPERTY_INITIAL_ENABLED_PACKS,
  SERVER_PROPERTY_LEVEL_NAME,
  SERVER_PROPERTY_LEVEL_SEED,
  SERVER_PROPERTY_LEVEL_TYPE,
  SERVER_PROPERTY_LOG_IPS,
  SERVER_PROPERTY_MAX_CHAINED_NEIGHBOR_UPDATES,
  SERVER_PROPERTY_MAX_PLAYERS,
  SERVER_PROPERTY_MAX_TICK_TIME,
  SERVER_PROPERTY_MAX_WORLD_SIZE,
  SERVER_PROPERTY_MOTD,
  SERVER_PROPERTY_NETWORK_COMPRESSION_THRESHOLD,
  SERVER_PROPERTY_ONLINE_MODE,
  SERVER_PROPERTY_OP_PERMISSION_LEVEL,
  SERVER_PROPERTY_PLAYER_IDLE_TIMEOUT,
  SERVER_PROPERTY_PREVENT_PROXY_CONNECTIONS,
  SERVER_PROPERTY_PVP,
  SERVER_PROPERTY_QUERY_PORT,
  SERVER_PROPERTY_RATE_LIMIT,
  SERVER_PROPERTY_RCON_PASSWORD,
  SERVER_PROPERTY_RCON_PORT,
  SERVER_PROPERTY_REQUIRE_RESOURCE_PACK,
  SERVER_PROPERTY_RESOURCE_PACK,
  SERVER_PROPERTY_RESOURCE_PACK_ID,
  SERVER_PROPERTY_RESOURCE_PACK_PROMPT,
  SERVER_PROPERTY_RESOURCE_PACK_SHA1,
  SERVER_PROPERTY_SERVER_IP,
  SERVER_PROPERTY_SERVER_PORT,
  SERVER_PROPERTY_SIMULATION_DISTANCE,
  SERVER_PROPERTY_SPAWN_ANIMALS,
  SERVER_PROPERTY_SPAWN_MONSTERS,
  SERVER_PROPERTY_SPAWN_NPCS,
  SERVER_PROPERTY_SPAWN_PROTECTION,
  SERVER_PROPERTY_SYNC_CHUNK_WRITES,
  SERVER_PROPERTY_TEXT_FILTERING_CONFIG,
  SERVER_PROPERTY_USE_NATIVE_TRANSPORT,
  SERVER_PROPERTY_VIEW_DISTANCE,
  SERVER_PROPERTY_WHITE_LIST,
} from '../config/minecraft';
import { DatabaseReferences } from '../database/database-references';
import { randomPassword } from '../helpers/rcon-password';
import { Environment } from '../helpers/environment';

// Types
import {
  MinecraftDifficulty,
  MinecraftGamemode,
  MinecraftLevelType,
} from '../types/minecraft';
import { ServerSettings } from '../types/tables';
import { Dictionary } from '../types';

/**
 * Static reference to server properties.
 */
export class ServerProperties {
  /**
   * Server settings instance.
   */
  static _settings = null as  ServerSettings | null;

  /**
   * Do players start with a starter kit.
   *
   * @type {boolean}
   */
  static EnableStarterKit(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.starterKit : false;
  }

  /**
   * Contents of starter kit.
   *
   * @type {string[]}
   */
   static StarterKit(): string[] {
    return ServerProperties._settings ? ServerProperties._settings.starterKitItems : [
      'iron_pickaxe',
      'iron_shovel',
      'iron_axe',
      'iron_sword',
      'red_bed',
      'bread 32',
    ];
  }

  /**
   * Can players set a home.
   *
   * @type {boolean}
   */
  static EnableHome(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.home : false;
  }

  /**
   * Can players set a spawn.
   *
   * @type {boolean}
   */
  static EnableSpawn(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.spawn : false;
  }

  /**
   * Can players warp.
   *
   * @type {boolean}
   */
  static EnableWarp(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.warp : false;
  }

  /**
   * Can players teleport to each other.
   *
   * @type {boolean}
   */
  static EnableTpa(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.tpa : false;
  }

  /**
   * Can players teleport back.
   *
   * @type {boolean}
   */
  static EnableBack(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.back : false;
  }

  /**
   * Can players vote for day.
   *
   * @type {boolean}
   */
  static EnableDayVote(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.day : false;
  }

  /**
   * Can players vote for night.
   *
   * @type {boolean}
   */
  static EnableNightVote(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.night : false;
  }

  /**
   * Can players vote for weather.
   *
   * @type {boolean}
   */
  static EnableWeatherVote(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.weather : false;
  }

  /**
   * Allows users to use flight on the server while in Survival mode.
   *
   * @type {boolean}
   */
  static AllowFlight(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.allowFlight : true;
  }

  /**
   * Allows players to travel to the Nether.
   *
   * @type {boolean}
   */
  static AllowNether(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.allowNether : true;
  }

  /**
   * Send console command outputs to all online operators.
   *
   * @type {boolean}
   */
  static BroadcastConsoleToOps(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastConsoleToOps : true;
  }

  /**
   * Send rcon console command outputs to all online operators.
   *
   * @type {boolean}
   */
  static BroadcastRconToOps(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastRconToOps : false;
  }

  /**
   * Defines the difficulty (such as damage dealt by mobs and the way hunger and poison affects players) of the server.
   *
   * @type {MinecraftDifficulty}
   */
  static Difficulty(): MinecraftDifficulty {
    return ServerProperties._settings ? ServerProperties._settings.difficulty : 'hard' as MinecraftDifficulty;
  };

  /**
   * Enables command blocks
   *
   * @type {boolean}
   */
  static EnableCommandBlock(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.enableCommandBlock : false;
  }

  /**
   * Exposes an MBean with the Object name net.minecraft.server:type=Server and two attributes averageTickTime and tickTimes exposing the tick times in milliseconds.
   *
   * @type {boolean}
   */
  static EnableJmxMonitoring(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.enableJmxMonitoring : false;
  }

  /**
   * Enables GameSpy4 protocol server listener. Used to get information about server.
   *
   * @type {boolean}
   */
  static EnableQuery(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.enableQuery : false;
  }

  /**
   * Enables remote access to the server console. Must stay true for a lot of functionality.
   *
   * @type {boolean}
   */
  static EnableRcon(): boolean {
    return true;
  }

  /**
   * Makes the server appear as "online" on the server list.
   *
   * @type {boolean}
   */
  static EnableStatus(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.enableStatus : true;
  }

  /**
   * If set to true, players without a Mojang-signed public key will not be able to connect to the server.
   *
   * @type {boolean}
   */
  static EnforceSecureProfile(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.enforceSecureProfile : true;
  }

  /**
   * Enforces the whitelist on the server.
   *
   * @type {boolean}
   */
  static EnforceWhitelist(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.enforceWhitelist : true;
  }

  /**
   * Controls how close entities need to be before being sent to clients. Higher values means they'll be rendered from farther away, potentially causing more lag. This is expressed the percentage of the default value. For example, setting to 50 will make it half as usual.
   * 
   * @type {number}
   */
  static EntityBroadcastRangePercentage(): number {
    return ServerProperties._settings ? ServerProperties._settings.entityBroadcastRangePercentage : 100;
  }

  /**
   * Force players to join in the default game mode.
   * 
   * @type {boolean}
   */
  static ForceGamemode(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.forceGamemode : false;
  }

  /**
   * Sets the default permission level for functions.
   * 
   * @type {number}
   */
  static FunctionPermissionLevel(): number {
    return ServerProperties._settings ? ServerProperties._settings.functionPermissionLevel : 2;
  }

  /**
   * Defines the mode of gameplay.
   * 
   * @type {MinecraftGamemode}
   */
  static Gamemode(): MinecraftGamemode {
    return ServerProperties._settings ? ServerProperties._settings.gamemode : 'survival' as MinecraftGamemode;
  };

  /**
   * Defines whether structures (such as villages) can be generated.
   * 
   * @type {boolean}
   */
  static GenerateStructures(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.generateStructures : true;
  }

  /**
   * The settings used to customize world generation. Follow its format and write the corresponding JSON string. Remember to escape all : with \:.
   * 
   * @type {Dictionary<any>}
   */
  static GeneratorSettings(): Dictionary<any> {
    return ServerProperties._settings ? ServerProperties._settings.generatorSettings : {};
  }
  
  /**
   * If set to true, server difficulty is ignored and set to hard and players are set to spectator mode if they die.
   * 
   * @type {boolean}
   */
  static Hardcore(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.hardcore : false;
  }
  
  /**
   * If set to true, a player list is not sent on status requests.
   * 
   * @type {boolean}
   */
  static HideOnlinePlayers(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.hideOnlinePlayers : false;
  }
  
  /**
   * Comma-separated list of datapacks to not be auto-enabled on world creation.
   * 
   * @type {string}
   */
  static InitialDisabledPacks(): string {
    return ServerProperties._settings ? ServerProperties._settings.initialDisabledPacks : '';
  }
  
  /**
   * Comma-separated list of datapacks to be enabled during world creation. Feature packs need to be explicitly enabled.
   * 
   * @type {string}
   */
  static InitialEnabledPacks(): string {
    return ServerProperties._settings ? ServerProperties._settings.initialEnabledPacks : 'vanilla';
  }
  
  /**
   * The "level-name" value is used as the world name and its folder name. The player may also copy their saved game folder here, and change the name to the same as that folder's to load it instead.
   * 
   * @type {string}
   */
  static LevelName(): string {
    return ServerProperties._settings ? ServerProperties._settings.levelName : 'world';
  }
  
  /**
   * 	Sets a world seed for the player's world, as in Singleplayer. The world generates with a random seed if left blank.
   * 
   * @type {number}
   */
  static LevelSeed(): number {
    return ServerProperties._settings ? ServerProperties._settings.levelSeed : Math.floor(Math.random() * 9999999999999999999);
  }
  
  /**
   * Determines the world preset that is generated. Escaping ":" is required when using a world preset ID, and the vanilla world preset ID's namespace (minecraft:) can be omitted.
   * 
   * @type {MinecraftLevelType}
   */
  static LevelType(): MinecraftLevelType {
    return ServerProperties._settings ? ServerProperties._settings.levelType : 'minecraft\:normal' as MinecraftLevelType;
  };
  
  /**
   * Whether to log IPs.
   */
  static LogIps(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.logIps : true;
  }
  
  /**
   * Limiting the amount of consecutive neighbor updates before skipping additional ones. Negative values remove the limit.
   * 
   * @type {number}
   */
  static MaxChainedNeighborUpdates(): number {
    return ServerProperties._settings ? ServerProperties._settings.maxChainedNeighborUpdates : 1000000;
  }
  
  /**
   * The maximum number of players that can play on the server at the same time.
   * 
   * @type {number}
   */
  static MaxPlayers(): number {
    return ServerProperties._settings ? ServerProperties._settings.maxPlayers : 30;
  }
  
  /**
   * The maximum number of milliseconds a single tick may take before the server watchdog stops the server with the message.
   * 
   * @type {number}
   */
  static MaxTickTime(): number {
    return ServerProperties._settings ? ServerProperties._settings.maxTickTime : 60000;
  }
  
  /**
   * This sets the maximum possible size in blocks, expressed as a radius, that the world border can obtain.
   * 
   * @type {number}
   */
  static MaxWorldSize(): number {
    return ServerProperties._settings ? ServerProperties._settings.maxWorldSize : 29999984;
  }
  
  /**
   * This is the message that is displayed in the server list of the client, below the name.
   * 
   * @type {string[]}
   */
  static Motd(): string {
    if (ServerProperties._settings) {
      const index = (new Date()).getDate() % ServerProperties._settings.motd.length;

      return ServerProperties._settings.motd[index];
    }
    return 'Minecraft Server';
  };
  
  /**
   * By default it allows packets that are n-1 bytes big to go normally, but a packet of n bytes or more gets compressed down.
   * 
   * @type {number}
   */
  static NetworkCompressionThreshold(): number {
    return ServerProperties._settings ? ServerProperties._settings.networkCompressionThreshold : 256;
  }
  
  /**
   * Server checks connecting players against Minecraft account database. Set this to false only if the player's server is not connected to the Internet.
   * 
   * @type {boolean}
   */
  static OnlineMode(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.onlineMode : true;
  }
  
  /**
   * Sets the default permission level for ops when using /op.
   * 
   * @type {number}
   */
  static OpPermissionLevel(): number {
    return ServerProperties._settings ? ServerProperties._settings.opPermissionLevel : 4;
  }
  
  /**
   * If non-zero, players are kicked from the server if they are idle for more than that many minutes.
   * 
   * @type {number}
   */
  static PlayerIdleTimeout(): number {
    return ServerProperties._settings ? ServerProperties._settings.playerIdleTimeout : 0;
  }
  
  /**
   * If the ISP/AS sent from the server is different from the one from Mojang Studios' authentication server, the player is kicked.
   * 
   * @type {boolean}
   */
  static PreventProxyConnections(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.preventProxyConnections : false;
  }
  
  /**
   * Enable PvP on the server. Players shooting themselves with arrows receive damage only if PvP is enabled.
   * 
   * @type {boolean}
   */
  static Pvp(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.pvp : true;
  }
  
  /**
   * Sets the port for the query server (see enable-query).
   * 
   * @type {number}
   */
  static QueryPort(): number {
    return ServerProperties._settings ? ServerProperties._settings.queryPort : 25565;
  }
  
  /**
   * Sets the maximum amount of packets a user can send before getting kicked. Setting to 0 disables this feature.
   * 
   * @type {number}
   */
  static RateLimit(): number {
    return ServerProperties._settings ? ServerProperties._settings.rateLimit : 0;
  }

  /**
   * Stored password.
   */
  static _rconPassword: string;
  
  /**
   * Sets the password for RCON: a remote console protocol that can allow other applications to connect and interact with a Minecraft server over the internet.
   * 
   * @type {string}
   */
  static RconPassword(): string {
    if (!ServerProperties._rconPassword) {
      if (ServerProperties._settings && ServerProperties._settings.rconPassword.length) {
        ServerProperties._rconPassword = ServerProperties._settings.rconPassword;
      } else {
        ServerProperties._rconPassword = randomPassword();
      }
    }

    return ServerProperties._rconPassword;
  }
  
  /**
   * Sets the RCON network port.
   * 
   * @type {number}
   */
  static RconPort(): number {
    return ServerProperties._settings ? ServerProperties._settings.rconPort : 3000;
  }
  
  /**
   * When this option is enabled (set to true), players will be prompted for a response and will be disconnected if they decline the required pack.
   * 
   * @type {boolean}
   */
  static RequireResourcePack(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.requireResourcePack : false;
  }
  
  /**
   * Optional URI to a resource pack. The player may choose to use it.
   * 
   * @type {string}
   */
  static ResourcePack(): string {
    return ServerProperties._settings ? ServerProperties._settings.resourcePack : '';
  }
  
  /**
   * Unknown.
   * 
   * @type {string}
   */
  static ResourcePackId(): string {
    return ServerProperties._settings ? ServerProperties._settings.resourcePackId : '';
  }
  
  /**
   * Optional, adds a custom message to be shown on resource pack prompt when require-resource-pack is used.
   * 
   * @type {string}
   */
  static ResourcePackPrompt(): string {
    return ServerProperties._settings ? ServerProperties._settings.resourcePackPrompt : '';
  }
  
  /**
   * Optional SHA-1 digest of the resource pack, in lowercase hexadecimal.
   * 
   * @type {string}
   */
  static ResourcePackSha1(): string {
    return ServerProperties._settings ? ServerProperties._settings.resourcePackSha1 : '';
  }
  
  /**
   * The player should set this if they want the server to bind to a particular IP. It is strongly recommended that the player leaves server-ip blank.
   * 
   * @type {string}
   */
  static ServerIp(): string {
    return ServerProperties._settings ? ServerProperties._settings.serverIp : '';
  }
  
  /**
   * Changes the port the server is hosting (listening) on. This port must be forwarded if the server is hosted in a network using NAT (if the player has a home router/firewall).
   * 
   * @type {number}
   */
  static ServerPort(): number {
    return ServerProperties._settings ? ServerProperties._settings.serverPort : 25565;
  }
  
  /**
   * Sets the maximum distance from players that living entities may be located in order to be updated by the server, measured in chunks in each direction of the player (radius, not diameter).
   * 
   * @type {number}
   */
  static SimulationDistance(): number {
    return ServerProperties._settings ? ServerProperties._settings.simulationDistance : 10;
  }
  
  /**
   * Determines if animals can spawn.
   * 
   * @type {boolean}
   */
  static SpawnAnimals(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.spawnAnimals : true;
  }
  
  /**
   * Determines if monsters can spawn.
   * 
   * @type {boolean}
   */
  static SpawnMonsters(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.spawnMonsters : true;
  }
  
  /**
   * Determines whether villagers can spawn.
   * 
   * @type {boolean}
   */
  static SpawnNpcs(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.spawnNpcs : true;
  }
  
  /**
   * Determines the side length of the square spawn protection area as 2x+1. 
   * 
   * @type {number}
   */
  static SpawnProtection(): number {
    return ServerProperties._settings ? ServerProperties._settings.spawnProtection : 16;
  }
  
  /**
   * Enables synchronous chunk writes.
   * 
   * @type {boolean}
   */
  static SyncChunkWrites(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.syncChunkWrites : true;
  }
  
  /**
   * Unknown.
   * 
   * @type {string}
   */
  static TextFilteringConfig(): string {
    return ServerProperties._settings ? ServerProperties._settings.textFilteringConfig : '';
  }
  
  /**
   * Linux server performance improvements: optimized packet sending/receiving on Linux.
   * 
   * @type {boolean}
   */
  static UseNativeTransport(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.useNativeTransport : true;
  }
  
  /**
   * Sets the amount of world data the server sends the client, measured in chunks in each direction of the player (radius, not diameter). It determines the server-side viewing distance.
   * 
   * @type {number}
   */
  static ViewDistance(): number {
    return ServerProperties._settings ? ServerProperties._settings.viewDistance : 10;
  }
  
  /**
   * Enables a whitelist on the server.
   * 
   * @type {boolean}
   */
  static WhiteList(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.whiteList : true;
  }

  /**
   * Whether to broadcast console.
   * 
   * @type {boolean}
   */
  static BroadcastConsole(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastConsole : true;
  }

  /**
   * Whether to broadcast logins.
   * 
   * @type {boolean}
   */
  static BroadcastLogin(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastLogin : false;
  }

  /**
   * Whether to broadcast logout.
   * 
   * @type {boolean}
   */
  static BroadcastLogout(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastLogout : false;
  }

  /**
   * Whether to broadcast chats.
   * 
   * @type {boolean}
   */
  static BroadcastChat(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastChat : false;
  }

  /**
   * Whether to broadcast achievements.
   * 
   * @type {boolean}
   */
  static BroadcastAchievement(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastAchievement : false;
  }

  /**
   * Whether to broadcast achievement overtakes.
   * 
   * @type {boolean}
   */
  static BroadcastAchievementOvertake(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastAchievementOvertake : true;
  }

  /**
   * Whether to broadcast playtime overtakes.
   * 
   * @type {boolean}
   */
  static BroadcastPlaytimeOvertake(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastPlaytimeOvertake : true;
  }

  /**
   * Whether to broadcast deaths.
   * 
   * @type {boolean}
   */
  static BroadcastDeath(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastDeath : true;
  }

  /**
   * Whether to broadcast death overtakes.
   * 
   * @type {boolean}
   */
  static BroadcastDeathOvertake(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastDeathOvertake : true;
  }

  /**
   * Whether to broadcast server start.
   * 
   * @type {boolean}
   */
  static BroadcastServerStart(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastServerStart : true;
  }

  /**
   * Whether to broadcast server restarts.
   * 
   * @type {boolean}
   */
  static BroadcastServerRestart(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.broadcastServerRestart : true;
  }

  /**
   * How much memory to allocate in GB.
   * 
   * @type {number}
   */
  static ServerMemory(): number {
    return ServerProperties._settings ? ServerProperties._settings.serverMemory : 10;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {boolean}
   */
  static UseG1GC(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.useG1GC : true;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {boolean}
   */
  static UseParallelRefProc(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.useParallelRefProc : true;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static MaxGCPauseMillis(): number {
    return ServerProperties._settings ? ServerProperties._settings.maxGCPauseMillis : 200;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {boolean}
   */
  static UseExperimentalVMOptions(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.useExperimentalVMOptions : true;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {boolean}
   */
  static UseExplicitGC(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.useExplicitGC : false;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {boolean}
   */
  static AlwaysPreferTouch(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.alwaysPreferTouch : true;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static G1NewSizePercent(): number {
    if (ServerProperties._settings
    && ServerProperties._settings.g1NewSizePercent !== -1) {
      return ServerProperties._settings.g1NewSizePercent;
    } 
    
    if (ServerProperties.ServerMemory() > 12) {
      return 40;
    }
    return 30;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static G1MaxNewSizePercent(): number {
    if (ServerProperties._settings
    && ServerProperties._settings.g1MaxNewSizePercent !== -1) {
      return ServerProperties._settings.g1MaxNewSizePercent;
    } 
    
    if (ServerProperties.ServerMemory() > 12) {
      return 50;
    }
    return 40;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static G1HeapRegionSize(): number {
    if (ServerProperties._settings
    && ServerProperties._settings.g1HeapRegionSize !== -1) {
      return ServerProperties._settings.g1HeapRegionSize;
    } 
    
    if (ServerProperties.ServerMemory() > 12) {
      return 16;
    }
    return 8;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static G1ReservePercent(): number {
    if (ServerProperties._settings
    && ServerProperties._settings.g1ReservePercent !== -1) {
      return ServerProperties._settings.g1ReservePercent;
    } 
    
    if (ServerProperties.ServerMemory() > 12) {
      return 15;
    }
    return 20;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static G1HeapWastePercent(): number {
    return ServerProperties._settings ? ServerProperties._settings.g1HeapWastePercent : 5;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static G1MixedGCCountTarget(): number {
    return ServerProperties._settings ? ServerProperties._settings.g1MixedGCCountTarget : 4;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static InitiatingHeapOccupancyPercent(): number {
    if (ServerProperties._settings
    && ServerProperties._settings.initiatingHeapOccupancyPercent !== -1) {
      return ServerProperties._settings.initiatingHeapOccupancyPercent;
    } 
    
    if (ServerProperties.ServerMemory() > 12) {
      return 20;
    }
    return 15;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static G1MixedGCLiveThresholdPercent(): number {
    return ServerProperties._settings ? ServerProperties._settings.g1MixedGCLiveThresholdPercent : 90;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static G1RSetUpdatingPauseTimePercent(): number {
    return ServerProperties._settings ? ServerProperties._settings.g1RSetUpdatingPauseTimePercent : 5;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static SurvivorRatio(): number {
    return ServerProperties._settings ? ServerProperties._settings.survivorRatio : 32;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {boolean}
   */
  static PerfSharedMem(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.perfSharedMem : false;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {number}
   */
  static MaxTenuringThreshold(): number {
    return ServerProperties._settings ? ServerProperties._settings.maxTenuringThreshold : 1;
  }

  /**
   * See https://docs.papermc.io/paper/aikars-flags
   * 
   * @type {boolean}
   */
  static UseAikarsFlags(): boolean {
    return ServerProperties._settings ? ServerProperties._settings.useAikarsFlags : true;
  }

  /**
   * Loads settings from table.
   *
   * @param {ServerSettings | null} settings Server settings.
   */
  static async LoadSettings(settings: ServerSettings | null = null): Promise<void> {
    if (settings) {
      ServerProperties._settings = settings;
    } else {
      ServerProperties._settings = await DatabaseReferences.getServerSettings();
    }
  }

  /**
   * Alters a passed server properties list and changes settings.
   *
   * @param {string} data Server properties.
   */
  static EditServerProperties(data: string): string {
    const edited = data.replace(SERVER_PROPERTY_ALLOW_FLIGHT, `allow-flight=${ServerProperties.AllowFlight()}`)
      .replace(SERVER_PROPERTY_ALLOW_NETHER, `allow-nether=${ServerProperties.AllowNether()}`)
      .replace(SERVER_PROPERTY_BROADCAST_CONSOLE_TO_OPS, `broadcast-console-to-ops=${ServerProperties.BroadcastConsoleToOps()}`)
      .replace(SERVER_PROPERTY_BROADCAST_RCON_TO_OPS, `broadcast-rcon-to-ops=${ServerProperties.BroadcastRconToOps()}`)
      .replace(SERVER_PROPERTY_DIFFICULTY, `difficulty=${ServerProperties.Difficulty()}`)
      .replace(SERVER_PROPERTY_ENABLE_COMMAND_BLOCK, `enable-command-block=${ServerProperties.EnableCommandBlock()}`)
      .replace(SERVER_PROPERTY_ENABLE_JMX_MONITORING, `enable-jmx-monitoring=${ServerProperties.EnableJmxMonitoring()}`)
      .replace(SERVER_PROPERTY_ENABLE_QUERY, `enable-query=${ServerProperties.EnableQuery()}`)
      .replace(SERVER_PROPERTY_ENABLE_RCON, `enable-rcon=${ServerProperties.EnableRcon()}`)
      .replace(SERVER_PROPERTY_ENABLE_STATUS, `enable-status=${ServerProperties.EnableStatus()}`)
      .replace(SERVER_PROPERTY_ENFORCE_SECURE_PROFILE, `enforce-secure-profile=${ServerProperties.EnforceSecureProfile()}`)
      .replace(SERVER_PROPERTY_ENFORCE_WHITE_LIST, `enforce-whitelist=${ServerProperties.EnforceWhitelist()}`)
      .replace(SERVER_PROPERTY_ENTITY_BROADCAST_RANGE_PERCENTAGE, `entity-broadcast-range-percentage=${ServerProperties.EntityBroadcastRangePercentage()}`)
      .replace(SERVER_PROPERTY_FORCE_GAMEMODE, `force-gamemode=${ServerProperties.ForceGamemode()}`)
      .replace(SERVER_PROPERTY_FUNCTION_PERMISSION_LEVEL, `function-permission-level=${ServerProperties.FunctionPermissionLevel()}`)
      .replace(SERVER_PROPERTY_GAMEMODE, `gamemode=${ServerProperties.Gamemode()}`)
      .replace(SERVER_PROPERTY_GENERATE_STRUCTURES, `generate-structures=${JSON.stringify(ServerProperties.GenerateStructures()).replace(':', '\\:')}`)
      .replace(SERVER_PROPERTY_GENERATOR_SETTINGS, `generator-settings=${ServerProperties.GeneratorSettings()}`)
      .replace(SERVER_PROPERTY_HARDCORE, `hardcore=${ServerProperties.Hardcore()}`)
      .replace(SERVER_PROPERTY_HIDE_ONLINE_PLAYERS, `hide-online-players=${ServerProperties.HideOnlinePlayers()}`)
      .replace(SERVER_PROPERTY_INITIAL_DISABLED_PACKS, `initial-disabled-packs=${ServerProperties.InitialDisabledPacks()}`)
      .replace(SERVER_PROPERTY_INITIAL_ENABLED_PACKS, `initial-enabled-packs=${ServerProperties.InitialEnabledPacks()}`)
      .replace(SERVER_PROPERTY_LEVEL_NAME, `level-name=${ServerProperties.LevelName()}`)
      .replace(SERVER_PROPERTY_LEVEL_SEED, `level-seed=${ServerProperties.LevelSeed()}`)
      .replace(SERVER_PROPERTY_LEVEL_TYPE, `level-type=${ServerProperties.LevelType()}`)
      .replace(SERVER_PROPERTY_LOG_IPS, `log-ips=${ServerProperties.LogIps()}`)
      .replace(SERVER_PROPERTY_MAX_CHAINED_NEIGHBOR_UPDATES, `max-chained-neighbor-updates=${ServerProperties.MaxChainedNeighborUpdates()}`)
      .replace(SERVER_PROPERTY_MAX_PLAYERS, `max-players=${ServerProperties.MaxPlayers()}`)
      .replace(SERVER_PROPERTY_MAX_TICK_TIME, `max-tick-time=${ServerProperties.MaxTickTime()}`)
      .replace(SERVER_PROPERTY_MAX_WORLD_SIZE, `max-world-size=${ServerProperties.MaxWorldSize()}`)
      .replace(SERVER_PROPERTY_MOTD, `motd=${ServerProperties.Motd()}`)
      .replace(SERVER_PROPERTY_NETWORK_COMPRESSION_THRESHOLD, `network-compression-threshold=${ServerProperties.NetworkCompressionThreshold()}`)
      .replace(SERVER_PROPERTY_ONLINE_MODE, `online-mode=${ServerProperties.OnlineMode()}`)
      .replace(SERVER_PROPERTY_OP_PERMISSION_LEVEL, `op-permission-level=${ServerProperties.OpPermissionLevel()}`)
      .replace(SERVER_PROPERTY_PLAYER_IDLE_TIMEOUT, `player-idle-timeout=${ServerProperties.PlayerIdleTimeout()}`)
      .replace(SERVER_PROPERTY_PREVENT_PROXY_CONNECTIONS, `prevent-proxy-connections=${ServerProperties.PreventProxyConnections()}`)
      .replace(SERVER_PROPERTY_PVP, `pvp=${ServerProperties.Pvp()}`)
      .replace(SERVER_PROPERTY_QUERY_PORT, `query.port=${ServerProperties.QueryPort()}`)
      .replace(SERVER_PROPERTY_RATE_LIMIT, `rate-limit=${ServerProperties.RateLimit()}`)
      .replace(SERVER_PROPERTY_RCON_PASSWORD, `rcon.password=${ServerProperties.RconPassword()}`)
      .replace(SERVER_PROPERTY_RCON_PORT, `rcon.port=${ServerProperties.RconPort()}`)
      .replace(SERVER_PROPERTY_REQUIRE_RESOURCE_PACK, `require-resource-pack=${ServerProperties.RequireResourcePack()}`)
      .replace(SERVER_PROPERTY_RESOURCE_PACK, `resource-pack=${ServerProperties.ResourcePack()}`)
      .replace(SERVER_PROPERTY_RESOURCE_PACK_ID, `resource-pack-id=${ServerProperties.ResourcePackId()}`)
      .replace(SERVER_PROPERTY_RESOURCE_PACK_PROMPT, `resource-pack-prompt=${ServerProperties.ResourcePackPrompt()}`)
      .replace(SERVER_PROPERTY_RESOURCE_PACK_SHA1, `resource-pack-sha1=${ServerProperties.ResourcePackSha1()}`)
      .replace(SERVER_PROPERTY_SERVER_IP, `server-ip=${ServerProperties.ServerIp()}`)
      .replace(SERVER_PROPERTY_SERVER_PORT, `server-port=${ServerProperties.ServerPort()}`)
      .replace(SERVER_PROPERTY_SIMULATION_DISTANCE, `simulation-distance=${ServerProperties.SimulationDistance()}`)
      .replace(SERVER_PROPERTY_SPAWN_ANIMALS, `spawn-animals=${ServerProperties.SpawnAnimals()}`)
      .replace(SERVER_PROPERTY_SPAWN_MONSTERS, `spawn-monsters=${ServerProperties.SpawnMonsters()}`)
      .replace(SERVER_PROPERTY_SPAWN_NPCS, `spawn-npcs=${ServerProperties.SpawnNpcs()}`)
      .replace(SERVER_PROPERTY_SPAWN_PROTECTION, `spawn-protection=${ServerProperties.SpawnProtection()}`)
      .replace(SERVER_PROPERTY_SYNC_CHUNK_WRITES, `sync-chunk-writes=${ServerProperties.SyncChunkWrites()}`)
      .replace(SERVER_PROPERTY_TEXT_FILTERING_CONFIG, `text-filtering-config=${ServerProperties.TextFilteringConfig()}`)
      .replace(SERVER_PROPERTY_USE_NATIVE_TRANSPORT, `use-native-transport=${ServerProperties.UseNativeTransport()}`)
      .replace(SERVER_PROPERTY_VIEW_DISTANCE, `view-distance=${ServerProperties.ViewDistance()}`)
      .replace(SERVER_PROPERTY_WHITE_LIST, `white-list=${ServerProperties.WhiteList()}`);

    return edited;
  }

  /**
   * Generates java flags.
   * 
   * @returns {string[]} Server flags.
   */
  static GetFlags(): string[] {
    const flags = [];

    flags.push(`-Xms${ServerProperties.ServerMemory()}G`);
    flags.push(`-Xmx${ServerProperties.ServerMemory()}G`);
    flags.push(`-XX:MaxGCPauseMillis=${ServerProperties.MaxGCPauseMillis()}`);
    flags.push(`-XX:SurvivorRatio=${ServerProperties.SurvivorRatio()}`);
    flags.push(`-XX:MaxTenuringThreshold=${ServerProperties.MaxTenuringThreshold()}`);

    if (ServerProperties.UseG1GC()) {
      flags.push('-XX:+UseG1GC');
    }
    if (ServerProperties.UseParallelRefProc()) {
      flags.push('-XX:+ParallelRefProcEnabled');
    }
    if (ServerProperties.UseExperimentalVMOptions()) {
      flags.push('-XX:+UnlockExperimentalVMOptions');
      flags.push(`-XX:G1NewSizePercent=${ServerProperties.G1NewSizePercent()}`);
      flags.push(`-XX:G1MaxNewSizePercent=${ServerProperties.G1MaxNewSizePercent()}`);
      flags.push(`-XX:G1HeapRegionSize=${ServerProperties.G1HeapRegionSize()}M`);
      flags.push(`-XX:G1ReservePercent=${ServerProperties.G1ReservePercent()}`);
      flags.push(`-XX:G1HeapWastePercent=${ServerProperties.G1HeapWastePercent()}`);
      flags.push(`-XX:G1MixedGCCountTarget=${ServerProperties.G1MixedGCCountTarget()}`);
      flags.push(`-XX:InitiatingHeapOccupancyPercent=${ServerProperties.InitiatingHeapOccupancyPercent()}`);
      flags.push(`-XX:G1MixedGCLiveThresholdPercent=${ServerProperties.G1MixedGCLiveThresholdPercent()}`);
      flags.push(`-XX:G1RSetUpdatingPauseTimePercent=${ServerProperties.G1RSetUpdatingPauseTimePercent()}`);
    }
    if (!ServerProperties.UseExplicitGC()) {
      flags.push('-XX:+DisableExplicitGC');
    }
    if (ServerProperties.AlwaysPreferTouch()) {
      flags.push('-XX:+AlwaysPreTouch');
    }
    if (!ServerProperties.PerfSharedMem()) {
      flags.push('-XX:+PerfDisableSharedMem');
    }
    if (ServerProperties.UseAikarsFlags()) {
      flags.push('-Dusing.aikars.flags=https://mcflags.emc.gs');
      flags.push('-Daikars.new.flags=true');
    }

    return flags;
  }

  /**
   * Generates server config for @scriptserver.
   * 
   * @returns {DeepPartial<Config>} Server config.
   */
  static GenerateServerConfig(): DeepPartial<Config> {
    return {
      javaServer: {
        path: __dirname,
        jar: Environment.getServerJarName(),
        args: ServerProperties.GetFlags(),
      },
      rconConnection: {
        host: RCON_HOST,
        port: ServerProperties.RconPort(),
        password: ServerProperties.RconPassword(),
      },
      essentials: {
        starterKit: {
          enabled: ServerProperties.EnableStarterKit(),
          items: ServerProperties.StarterKit(),
        },
        home: {
          enabled: ServerProperties.EnableHome(),
        },
        spawn: ServerProperties.EnableSpawn(),
        warp: {
          enabled: ServerProperties.EnableWarp(),
        },
        tpa: ServerProperties.EnableTpa(),
        back: ServerProperties.EnableBack(),
        day: {
          enabled: ServerProperties.EnableDayVote(),
        },
        night: {
          enabled: ServerProperties.EnableNightVote(),
        },
        weather: {
          enabled: ServerProperties.EnableWeatherVote(),
        },
      },
    }
  }

  /**
   * Exports to an object.
   *
   * @returns {ServerSettings} Settings object.
   */
  static Export(): ServerSettings {
    return {
      starterKit: ServerProperties.EnableStarterKit(),
      starterKitItems: ServerProperties.StarterKit(),
      home: ServerProperties.EnableHome(),
      spawn: ServerProperties.EnableSpawn(),
      warp: ServerProperties.EnableWarp(),
      tpa: ServerProperties.EnableTpa(),
      back: ServerProperties.EnableBack(),
      day: ServerProperties.EnableDayVote(),
      night: ServerProperties.EnableNightVote(),
      weather: ServerProperties.EnableWeatherVote(),
      broadcastConsole: ServerProperties.BroadcastConsole(),
      broadcastLogin: ServerProperties.BroadcastLogin(),
      broadcastLogout: ServerProperties.BroadcastLogout(),
      broadcastChat: ServerProperties.BroadcastChat(),
      broadcastAchievement: ServerProperties.BroadcastAchievement(),
      broadcastAchievementOvertake: ServerProperties.BroadcastAchievementOvertake(),
      broadcastPlaytimeOvertake: ServerProperties.BroadcastPlaytimeOvertake(),
      broadcastDeath: ServerProperties.BroadcastDeath(),
      broadcastDeathOvertake: ServerProperties.BroadcastDeathOvertake(),
      broadcastServerStart: ServerProperties.BroadcastServerStart(),
      broadcastServerRestart: ServerProperties.BroadcastServerRestart(),
      serverMemory: ServerProperties.ServerMemory(),
      useG1GC: ServerProperties.UseG1GC(),
      useParallelRefProc: ServerProperties.UseParallelRefProc(),
      maxGCPauseMillis: ServerProperties.MaxGCPauseMillis(),
      useExperimentalVMOptions: ServerProperties.UseExperimentalVMOptions(),
      useExplicitGC: ServerProperties.UseExplicitGC(),
      alwaysPreferTouch: ServerProperties.AlwaysPreferTouch(),
      g1NewSizePercent: ServerProperties.G1NewSizePercent(),
      g1MaxNewSizePercent: ServerProperties.G1MaxNewSizePercent(),
      g1HeapRegionSize: ServerProperties.G1HeapRegionSize(),
      g1ReservePercent: ServerProperties.G1ReservePercent(),
      g1HeapWastePercent: ServerProperties.G1HeapWastePercent(),
      g1MixedGCCountTarget: ServerProperties.G1MixedGCCountTarget(),
      initiatingHeapOccupancyPercent: ServerProperties.InitiatingHeapOccupancyPercent(),
      g1MixedGCLiveThresholdPercent: ServerProperties.G1MixedGCCountTarget(),
      g1RSetUpdatingPauseTimePercent: ServerProperties.G1RSetUpdatingPauseTimePercent(),
      survivorRatio: ServerProperties.SurvivorRatio(),
      perfSharedMem: ServerProperties.PerfSharedMem(),
      maxTenuringThreshold: ServerProperties.MaxTenuringThreshold(),
      useAikarsFlags: ServerProperties.UseAikarsFlags(),
      allowFlight: ServerProperties.AllowFlight(),
      allowNether: ServerProperties.AllowNether(),
      broadcastConsoleToOps: ServerProperties.BroadcastConsoleToOps(),
      broadcastRconToOps: ServerProperties.BroadcastRconToOps(),
      difficulty: ServerProperties.Difficulty(),
      enableCommandBlock: ServerProperties.EnableCommandBlock(),
      enableJmxMonitoring: ServerProperties.EnableJmxMonitoring(),
      enableQuery: ServerProperties.EnableQuery(),
      enableRcon: ServerProperties.EnableRcon(),
      enableStatus: ServerProperties.EnableStatus(),
      enforceSecureProfile: ServerProperties.EnforceSecureProfile(),
      enforceWhitelist: ServerProperties.EnforceWhitelist(),
      entityBroadcastRangePercentage: ServerProperties.EntityBroadcastRangePercentage(),
      forceGamemode: ServerProperties.ForceGamemode(),
      functionPermissionLevel: ServerProperties.FunctionPermissionLevel(),
      gamemode: ServerProperties.Gamemode(),
      generateStructures: ServerProperties.GenerateStructures(),
      generatorSettings: ServerProperties.GeneratorSettings(),
      hardcore: ServerProperties.Hardcore(),
      hideOnlinePlayers: ServerProperties.HideOnlinePlayers(),
      initialDisabledPacks: ServerProperties.InitialDisabledPacks(),
      initialEnabledPacks: ServerProperties.InitialEnabledPacks(),
      levelName: ServerProperties.LevelName(),
      levelSeed: ServerProperties.LevelSeed(),
      levelType: ServerProperties.LevelType(),
      logIps: ServerProperties.LogIps(),
      maxChainedNeighborUpdates: ServerProperties.MaxChainedNeighborUpdates(),
      maxPlayers: ServerProperties.MaxPlayers(),
      maxTickTime: ServerProperties.MaxTickTime(),
      maxWorldSize: ServerProperties.MaxWorldSize(),
      motd: ServerProperties._settings ? ServerProperties._settings.motd : ['A Minecraft Server'],
      networkCompressionThreshold: ServerProperties.NetworkCompressionThreshold(),
      onlineMode: ServerProperties.OnlineMode(),
      opPermissionLevel: ServerProperties.OpPermissionLevel(),
      playerIdleTimeout: ServerProperties.PlayerIdleTimeout(),
      preventProxyConnections: ServerProperties.PreventProxyConnections(),
      pvp: ServerProperties.Pvp(),
      queryPort: ServerProperties.QueryPort(),
      rateLimit: ServerProperties.RateLimit(),
      rconPassword: ServerProperties.RconPassword(),
      rconPort: ServerProperties.RconPort(),
      requireResourcePack: ServerProperties.RequireResourcePack(),
      resourcePack: ServerProperties.ResourcePack(),
      resourcePackId: ServerProperties.ResourcePackId(),
      resourcePackPrompt: ServerProperties.ResourcePackPrompt(),
      resourcePackSha1: ServerProperties.ResourcePackSha1(),
      serverIp: ServerProperties.ServerIp(),
      serverPort: ServerProperties.ServerPort(),
      simulationDistance: ServerProperties.SimulationDistance(),
      spawnAnimals: ServerProperties.SpawnAnimals(),
      spawnMonsters: ServerProperties.SpawnMonsters(),
      spawnNpcs: ServerProperties.SpawnNpcs(),
      spawnProtection: ServerProperties.SpawnProtection(),
      syncChunkWrites: ServerProperties.SyncChunkWrites(),
      textFilteringConfig: ServerProperties.TextFilteringConfig(),
      useNativeTransport: ServerProperties.UseNativeTransport(),
      viewDistance: ServerProperties.ViewDistance(),
      whiteList: ServerProperties.WhiteList(),
    };
  }
}
