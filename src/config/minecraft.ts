/**
 * Host for RCON.
 */
export const RCON_HOST = 'localhost';

/**
 * Selects EULA error message.
 */
export const EULA_ERROR_CONSOLE = /Go to eula.txt for more info/;

/**
 * Selects allow-flight in server.properties.
 */
export const SERVER_PROPERTY_ALLOW_FLIGHT = /^allow-flight=(true|false|.*)$/gim;

/**
 * Selects allow-nether in server.properties.
 */
export const SERVER_PROPERTY_ALLOW_NETHER = /^allow-nether=(true|false|.*)$/gim;

/**
 * Selects broadcast-console-to-ops in server.properties.
 */
export const SERVER_PROPERTY_BROADCAST_CONSOLE_TO_OPS = /^broadcast-console-to-ops=(true|false|.*)$/gim;

/**
 * Selects broadcast-rcon-to-ops in server.properties.
 */
export const SERVER_PROPERTY_BROADCAST_RCON_TO_OPS = /^broadcast-rcon-to-ops=(true|false|.*)$/gim;

/**
 * Selects difficulty in server.properties.
 */
export const SERVER_PROPERTY_DIFFICULTY = /^difficulty=(peaceful|easy|normal|hard|[0-3]|.*)$/gim;

/**
 * Selects enable-command-block in server.properties.
 */
export const SERVER_PROPERTY_ENABLE_COMMAND_BLOCK = /^enable-command-block=(true|false|.*)$/gim;

/**
 * Selects enable-jmx-monitoring in server.properties.
 */
export const SERVER_PROPERTY_ENABLE_JMX_MONITORING = /^enable-jmx-monitoring=(true|false|.*)$/gim;

/**
 * Selects enable-query in server.properties.
 */
export const SERVER_PROPERTY_ENABLE_QUERY = /^enable-query=(true|false|.*)$/gim;

/**
 * Selects enable-rcon in server.properties.
 */
export const SERVER_PROPERTY_ENABLE_RCON = /^enable-rcon=(true|false|.*)$/gim;

/**
 * Selects enable-status in server.properties.
 */
export const SERVER_PROPERTY_ENABLE_STATUS = /^enable-status=(true|false|.*)$/gim;

/**
 * Selects enforce-secure-profile in server.properties.
 */
export const SERVER_PROPERTY_ENFORCE_SECURE_PROFILE = /^enforce-secure-profile=(true|false|.*)$/gim;

/**
 * Selects enforce-whitelist in server.properties.
 */
export const SERVER_PROPERTY_ENFORCE_WHITE_LIST = /^enforce-whitelist=(true|false|.*)$/gim;

/**
 * Selects entity-broadcast-range-percentage in server.properties.
 */
export const SERVER_PROPERTY_ENTITY_BROADCAST_RANGE_PERCENTAGE = /^entity-broadcast-range-percentage=([0-9]*|.*)$/gim;

/**
 * Selects force-gamemode in server.properties.
 */
export const SERVER_PROPERTY_FORCE_GAMEMODE = /^force-gamemode=(true|false)$/gim;

/**
 * Selects function-permission-level in server.properties.
 */
export const SERVER_PROPERTY_FUNCTION_PERMISSION_LEVEL = /^function-permission-level=([0-9]*|.*)$/gim;

/**
 * Selects gamemode in server.properties.
 */
export const SERVER_PROPERTY_GAMEMODE = /^gamemode=(survival|creative|adventure|spectator|.*)$/gim;

/**
 * Selects NOT in server.properties.
 */
export const SERVER_PROPERTY_GENERATE_STRUCTURES = /^generate-structures=(true|false|.*)$/gim;

/**
 * Selects NOT in server.properties.
 */
export const SERVER_PROPERTY_GENERATOR_SETTINGS = /^generator-settings=(.*)$/gim;

/**
 * Selects NOT in server.properties.
 */
export const SERVER_PROPERTY_HARDCORE = /^hardcore=(true|false|.*)$/gim;

/**
 * Selects hide-online-players in server.properties.
 */
export const SERVER_PROPERTY_HIDE_ONLINE_PLAYERS = /^hide-online-players=(true|false|.*)$/gim;

/**
 * Selects initial-disabled-packs in server.properties.
 */
export const SERVER_PROPERTY_INITIAL_DISABLED_PACKS = /^initial-disabled-packs=(.*)$/gim;

/**
 * Selects initial-enabled-packs in server.properties.
 */
export const SERVER_PROPERTY_INITIAL_ENABLED_PACKS = /^initial-enabled-packs=(.*)$/gim;

/**
 * Selects level-name in server.properties.
 */
export const SERVER_PROPERTY_LEVEL_NAME = /^level-name=(.*)$/gim;

/**
 * Selects level-seed in server.properties.
 */
export const SERVER_PROPERTY_LEVEL_SEED = /^level-seed=([0-9]*|.*)$/gim;

/**
 * Selects level-type in server.properties.
 */
export const SERVER_PROPERTY_LEVEL_TYPE = /^level-type=(minecraft\\:normal|minecraft\\:flat|minecraft\\:large_biomes|minecraft\\:amplified|minecraft\\:single_biome_surface|.*)$/gim;

/**
 * Selects log-ips in server.properties.
 */
export const SERVER_PROPERTY_LOG_IPS = /^log-ips=(true|false|.*)$/gim;

/**
 * Selects max-chained-neighbor-updates in server.properties.
 */
export const SERVER_PROPERTY_MAX_CHAINED_NEIGHBOR_UPDATES = /^max-chained-neighbor-updates=([0-9]*|.*)$/gim;

/**
 * Selects max-players in server.properties.
 */
export const SERVER_PROPERTY_MAX_PLAYERS = /^max-players=([0-9]*|.*)$/gim;

/**
 * Selects max-tick-time in server.properties.
 */
export const SERVER_PROPERTY_MAX_TICK_TIME = /^max-tick-time=([0-9]*|.*)$/gim;

/**
 * Selects max-world-size in server.properties.
 */
export const SERVER_PROPERTY_MAX_WORLD_SIZE = /^max-world-size=([0-9]*|.*)$/gim;

/**
 * Selects motd in server.properties.
 */
export const SERVER_PROPERTY_MOTD = /^motd=(.*)$/gim;

/**
 * Selects network-compression-threshold in server.properties.
 */
export const SERVER_PROPERTY_NETWORK_COMPRESSION_THRESHOLD = /^network-compression-threshold=([0-9]*|.*)$/gim;

/**
 * Selects online-mode in server.properties.
 */
export const SERVER_PROPERTY_ONLINE_MODE = /^online-mode=(true|false|.*)$/gim;

/**
 * Selects op-permission-level in server.properties.
 */
export const SERVER_PROPERTY_OP_PERMISSION_LEVEL = /^op-permission-level=([0-9]*|.*)$/gim;

/**
 * Selects player-idle-timeout in server.properties.
 */
export const SERVER_PROPERTY_PLAYER_IDLE_TIMEOUT = /^player-idle-timeout=([0-9]*|.*)$/gim;

/**
 * Selects prevent-proxy-connections in server.properties.
 */
export const SERVER_PROPERTY_PREVENT_PROXY_CONNECTIONS = /^prevent-proxy-connections=(true|false|.*)$/gim;

/**
 * Selects pvp in server.properties.
 */
export const SERVER_PROPERTY_PVP = /^pvp=(true|false|.*)$/gim;

/**
 * Selects query.port in server.properties.
 */
export const SERVER_PROPERTY_QUERY_PORT = /^query.port=([0-9]*|.*)$/gim;

/**
 * Selects rate-limit in server.properties.
 */
export const SERVER_PROPERTY_RATE_LIMIT = /^rate-limit=([0-9]*|.*)$/gim;

/**
 * Selects rcon.password in server.properties.
 */
export const SERVER_PROPERTY_RCON_PASSWORD = /^rcon.password=(.*)$/gim;

/**
 * Selects rcon.port in server.properties.
 */
export const SERVER_PROPERTY_RCON_PORT = /^rcon.port=([0-9]*|.*)$/gim;

/**
 * Selects require-resource-pack in server.properties.
 */
export const SERVER_PROPERTY_REQUIRE_RESOURCE_PACK = /^require-resource-pack=(true|false|.*)$/gim;

/**
 * Selects resource-pack in server.properties.
 */
export const SERVER_PROPERTY_RESOURCE_PACK = /^resource-pack=(.*)$/gim;

/**
 * Selects resource-pack-id in server.properties.
 */
export const SERVER_PROPERTY_RESOURCE_PACK_ID = /^resource-pack-id=(.*)$/gim;

/**
 * Selects resource-pack-prompt in server.properties.
 */
export const SERVER_PROPERTY_RESOURCE_PACK_PROMPT = /^resource-pack-prompt=(.*)$/gim;

/**
 * Selects resource-pack-sha1 in server.properties.
 */
export const SERVER_PROPERTY_RESOURCE_PACK_SHA1 = /^resource-pack-sha1=(.*)$/gim;

/**
 * Selects server-ip in server.properties.
 */
export const SERVER_PROPERTY_SERVER_IP = /^server-ip=(.*)$/gim;

/**
 * Selects server-port in server.properties.
 */
export const SERVER_PROPERTY_SERVER_PORT = /^server-port=([0-9]*|.*)$/gim;

/**
 * Selects simulation-distance in server.properties.
 */
export const SERVER_PROPERTY_SIMULATION_DISTANCE = /^simulation-distance=([0-9]*|.*)$/gim;

/**
 * Selects spawn-animals in server.properties.
 */
export const SERVER_PROPERTY_SPAWN_ANIMALS = /^spawn-animals=(true|false|.*)$/gim;

/**
 * Selects spawn-monsters in server.properties.
 */
export const SERVER_PROPERTY_SPAWN_MONSTERS = /^spawn-monsters=(true|false|.*)$/gim;

/**
 * Selects spawn-npcs in server.properties.
 */
export const SERVER_PROPERTY_SPAWN_NPCS = /^spawn-npcs=(true|false|.*)$/gim;

/**
 * Selects spawn-protection in server.properties.
 */
export const SERVER_PROPERTY_SPAWN_PROTECTION = /^spawn-protection=([0-9]*|.*)$/gim;

/**
 * Selects sync-chunk-writes in server.properties.
 */
export const SERVER_PROPERTY_SYNC_CHUNK_WRITES = /^sync-chunk-writes=(true|false|.*)$/gim;

/**
 * Selects text-filtering-config in server.properties.
 */
export const SERVER_PROPERTY_TEXT_FILTERING_CONFIG = /^text-filtering-config=(.*)$/gim;

/**
 * Selects use-native-transport in server.properties.
 */
export const SERVER_PROPERTY_USE_NATIVE_TRANSPORT = /^use-native-transport=(true|false|.*)$/gim;

/**
 * Selects view-distance in server.properties.
 */
export const SERVER_PROPERTY_VIEW_DISTANCE = /^view-distance=([0-9]*|.*)$/gim;

/**
 * Selects white-list in server.properties.
 */
export const SERVER_PROPERTY_WHITE_LIST = /^white-list=(true|false)$/gim;

/**
 * Tests if a message is from a player.
 */
export const NOT_PLAYER_MESSAGE = /^\[\d+:\d+:\d+\]\s\[Server thread\/INFO\]: [^<^>]+$/;

/**
 * REGEX for death message.
 */
export const DEATH_MESSAGE = /^\[\d+:\d+:\d+\]\s\[Server thread\/INFO\]: ((.+) (was pricked to death|walked into a cactus while trying to escape .+|drowned|died from dehydration while trying to escape .+|died from dehydration|experienced kinetic energy while trying to escape .+|experienced kinetic energy|blew up|was blown up by .+|was killed by .+|hit the ground too hard while trying to escape .+|hit the ground too hard|fell from a high place|fell off a ladder|fell off some vines|fell off some weeping vines|fell off some twisting vines|fell off scaffolding|fell while climbing|was doomed to fall.*|was impaled on a stalagmite.*|was squashed by a falling anvil|was squashed by a falling block|was skewered by a falling stalactite|went up in flames|walked into fire while fighting .+|burned to death|was burned to a crisp while fighting.*|went off with a bang.*|tried to swim in lava.*|was struck by lightning.*|discovered the floor was lava|walked into the danger zone due to.*|was killed by magic.*|was killed by .+ using magic|was killed by .+ using .+|froze to death|was frozen to death by .+|was slain by.+|was stung to death.*|was obliterated by a sonically-charged shriek.*|was shot by .+|was pummeled by .+|was fireballed by .+|was shot by a skull from .+|starved to death.*|suffocated in a wall.*|was squished too much|was squashed by .+|left the confines of this world.*|was poked to death by a sweet berry bush.*|was killed while trying to hurt .+|was killed by .+ while trying to hurt .+|was impaled by .+|fell out of the world|didn\'t want to live in the same world as .+|withered away.*|died.*|was killed|didn\'t want to live as .+|was killed by even more magic)|death\.fell\.accident\.water)/;

/**
 * Encoding for fs.
 */
export const ENCODING = 'utf-8';

/**
 * Match index.
 */
export const DEATH_MESSAGE_KEYS = {
  FULL: 0,
  DEATH_MESSAGE: 1,
  PLAYER: 2,
  DEATH_WITHOUT_PLAYER: 3,
} as Record<string, number>;

/**
 * Arguments for minecraft server.
 */
export const MINECRAFT_ARGS = [
  '-Xmx10000M',
  '-Xms1000M',
  '-XX:+UseG1GC',
  '-XX:+ParallelRefProcEnabled',
  '-XX:MaxGCPauseMillis=200',
  '-XX:+UnlockExperimentalVMOptions',
  '-XX:+DisableExplicitGC',
  '-XX:+AlwaysPreTouch',
  '-XX:G1NewSizePercent=40',
  '-XX:G1MaxNewSizePercent=50',
  '-XX:G1HeapRegionSize=16M',
  '-XX:G1ReservePercent=15',
  '-XX:G1HeapWastePercent=5',
  '-XX:G1MixedGCCountTarget=4',
  '-XX:InitiatingHeapOccupancyPercent=20',
  '-XX:G1MixedGCLiveThresholdPercent=90',
  '-XX:G1RSetUpdatingPauseTimePercent=5',
  '-XX:SurvivorRatio=32',
  '-XX:+PerfDisableSharedMem',
  '-XX:MaxTenuringThreshold=1',
] as string[];
