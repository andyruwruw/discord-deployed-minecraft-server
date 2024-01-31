// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  starterKit: {
    type: Boolean,
    default: false,
  },

  starterKitItems: {
    type: Array,
    of: String,
    default: [],
  },

  home: {
    type: Boolean,
    default: false,
  },

  spawn: {
    type: Boolean,
    default: false,
  },

  warp: {
    type: Boolean,
    default: false,
  },

  tpa: {
    type: Boolean,
    default: false,
  },

  back: {
    type: Boolean,
    default: false,
  },

  day: {
    type: Boolean,
    default: false,
  },

  night: {
    type: Boolean,
    default: false,
  },

  weather: {
    type: Boolean,
    default: false,
  },

  broadcastConsole: {
    type: Boolean,
    default: true,
  },

  broadcastLogin: {
    type: Boolean,
    default: false,
  },

  broadcastLogout: {
    type: Boolean,
    default: false,
  },

  broadcastChat: {
    type: Boolean,
    default: false,
  },

  broadcastAchievement: {
    type: Boolean,
    default: false,
  },

  broadcastAchievementOvertake: {
    type: Boolean,
    default: true,
  },

  broadcastPlaytimeOvertake: {
    type: Boolean,
    default: true,
  },

  broadcastDeath: {
    type: Boolean,
    default: true,
  },

  broadcastDeathOvertake: {
    type: Boolean,
    default: true,
  },

  broadcastServerStart: {
    type: Boolean,
    default: true,
  },

  broadcastServerRestart: {
    type: Boolean,
    default: true,
  },

  serverMemory: {
    type: Number,
    default: 10,
  },

  useG1GC: {
    type: Boolean,
    default: true,
  },

  useParallelRefProc: {
    type: Boolean,
    default: true,
  },

  maxGCPauseMillis: {
    type: Number,
    default: 200,
  },

  useExperimentalVMOptions: {
    type: Boolean,
    default: true,
  },

  useExplicitGC: {
    type: Boolean,
    default: false,
  },

  alwaysPreferTouch: {
    type: Boolean,
    default: true,
  },

  g1NewSizePercent: {
    type: Number,
    default: -1,
  },

  g1MaxNewSizePercent: {
    type: Number,
    default: -1,
  },

  g1HeapRegionSize: {
    type: Number,
    default: -1,
  },

  g1ReservePercent: {
    type: Number,
    default: -1,
  },

  g1HeapWastePercent: {
    type: Number,
    default: 5,
  },

  g1MixedGCCountTarget: {
    type: Number,
    default: 4,
  },

  initiatingHeapOccupancyPercent: {
    type: Number,
    default: -1,
  },

  g1MixedGCLiveThresholdPercent: {
    type: Number,
    default: 90,
  },

  g1RSetUpdatingPauseTimePercent: {
    type: Number,
    default: 5,
  },

  survivorRatio: {
    type: Number,
    default: 32,
  },

  perfSharedMem: {
    type: Boolean,
    default: false,
  },

  maxTenuringThreshold: {
    type: Number,
    default: 1,
  },

  useAikarsFlags: {
    type: Boolean,
    default: true,
  },

  allowFlight: {
    type: Boolean,
    default: true,
  },

  allowNether: {
    type: Boolean,
    default: true,
  },

  broadcastConsoleToOps: {
    type: Boolean,
    default: true,
  },

  broadcastRconToOps: {
    type: Boolean,
    default: false,
  },

  difficulty: {
    type: String,
    default: 'hard',
  },

  enableCommandBlock: {
    type: Boolean,
    default: false,
  },

  enableJmxMonitoring: {
    type: Boolean,
    default: false,
  },

  enableQuery: {
    type: Boolean,
    default: false,
  },

  enableRcon: {
    type: Boolean,
    default: true,
  },

  enableStatus: {
    type: Boolean,
    default: true,
  },

  enforceSecureProfile: {
    type: Boolean,
    default: true,
  },

  enforceWhitelist: {
    type: Boolean,
    default: true,
  },

  entityBroadcastRangePercentage: {
    type: Number,
    default: 100,
  },

  forceGamemode: {
    type: Boolean,
    default: false,
  },

  functionPermissionLevel: {
    type: Number,
    default: 2,
  },

  gamemode: {
    type: String,
    default: 'survival',
  },

  generateStructures: {
    type: Boolean,
    default: true,
  },

  generatorSettings: {
    type: Object,
    default: {},
  },

  hardcore: {
    type: Boolean,
    default: false,
  },

  hideOnlinePlayers: {
    type: Boolean,
    default: false,
  },

  initialDisabledPacks: {
    type: String,
    default: '',
  },

  initialEnabledPacks: {
    type: String,
    default: 'vanilla',
  },

  levelName: {
    type: String,
    default: 'world',
  },

  levelSeed: {
    type: Number,
    default: 1063292310985219505,
  },

  levelType: {
    type: String,
    default: 'minecraft\:normal',
  },

  logIps: {
    type: Boolean,
    default: true,
  },

  maxChainedNeighborUpdates: {
    type: Number,
    default: 1000000,
  },

  maxPlayers: {
    type: Number,
    default: 30,
  },

  maxTickTime: {
    type: Number,
    default: 60000,
  },

  maxWorldSize: {
    type: Number,
    default: 29999984,
  },

  motd: {
    type: Array,
    of: String,
    default: [],
  },

  networkCompressionThreshold: {
    type: Number,
    default: 256,
  },

  onlineMode: {
    type: Boolean,
    default: true,
  },

  opPermissionLevel: {
    type: Number,
    default: 4,
  },

  playerIdleTimeout: {
    type: Number,
    default: 0,
  },

  preventProxyConnections: {
    type: Boolean,
    default: false,
  },

  pvp: {
    type: Boolean,
    default: true,
  },

  queryPort: {
    type: Number,
    default: 25565,
  },

  rateLimit: {
    type: Number,
    default: 0,
  },

  rconPassword: {
    type: String,
    default: '',
  },

  rconPort: {
    type: Number,
    default: 3000,
  },

  requireResourcePack: {
    type: Boolean,
    default: false,
  },

  resourcePack: {
    type: String,
    default: '',
  },

  resourcePackId: {
    type: String,
    default: '',
  },

  resourcePackPrompt: {
    type: String,
    default: '',
  },

  resourcePackSha1: {
    type: String,
    default: '',
  },

  serverIp: {
    type: String,
    default: '',
  },

  serverPort: {
    type: Number,
    default: 25565,
  },

  simulationDistance: {
    type: Number,
    default: 10,
  },

  spawnAnimals: {
    type: Boolean,
    default: true,
  },

  spawnMonsters: {
    type: Boolean,
    default: true,
  },

  spawnNpcs: {
    type: Boolean,
    default: true,
  },

  spawnProtection: {
    type: Number,
    default: 0,
  },

  syncChunkWrites: {
    type: Boolean,
    default: true,
  },

  textFilteringConfig: {
    type: String,
    default: '',
  },

  useNativeTransport: {
    type: Boolean,
    default: true,
  },

  viewDistance: {
    type: Number,
    default: 10,
  },

  whiteList: {
    type: Boolean,
    default: true,
  },
});

export const SettingsModel = model('Settings', schema);
