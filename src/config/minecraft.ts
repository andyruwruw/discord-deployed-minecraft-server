/**
 * Host for RCON.
 */
export const RCON_HOST = 'localhost';

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

/**
 * Selects EULA error message.
 */
export const EULA_CONSOLE_REGEX = /Go to eula.txt for more info/;

export const SERVER_PROPERTY_RCON_REGEX = /enable-rcon=[a-yA-Y]*$/gim;

export const SERVER_PROPERTY_RCON_PORT_REGEX = /rcon.port=[0-9]*$/gim;

export const SERVER_PROPERTY_RCON_PASSWORD_REGEX = /rcon.password=[a-yA-Y0-9]*$/gim;

export const SERVER_PROPERTY_RCON_BROADCAST_REGEX = /broadcast-rcon-to-ops=[a-yA-Y]*$/gim;

export const SERVER_PROPERTY_WHITE_LIST_REGEX = /white-list=[a-yA-Y]*$/gim;

export const SERVER_PROPERTY_ENFORCE_WHITE_LIST_REGEX = /enforce-whitelist=[a-yA-Y]*$/gim;

/**
 * Encoding for fs.
 */
export const ENCODING = 'utf-8';

/**
 * Tests if a message is from a player.
 */
export const NOT_PLAYER_MESSAGE = /^\[\d+:\d+:\d+\]\s\[Server thread\/INFO\]: [^<^>]+$/;

/**
 * REGEX for death message.
 */
export const DEATH_MESSAGE = /^\[\d+:\d+:\d+\]\s\[Server thread\/INFO\]: ((.+) (was pricked to death|walked into a cactus while trying to escape .+|drowned|died from dehydration while trying to escape .+|died from dehydration|experienced kinetic energy while trying to escape .+|experienced kinetic energy|blew up|was blown up by .+|was killed by .+|hit the ground too hard while trying to escape .+|hit the ground too hard|fell from a high place|fell off a ladder|fell off some vines|fell off some weeping vines|fell off some twisting vines|fell off scaffolding|fell while climbing|was doomed to fall.*|was impaled on a stalagmite.*|was squashed by a falling anvil|was squashed by a falling block|was skewered by a falling stalactite|went up in flames|walked into fire while fighting .+|burned to death|was burned to a crisp while fighting.*|went off with a bang.*|tried to swim in lava.*|was struck by lightning.*|discovered the floor was lava|walked into the danger zone due to.*|was killed by magic.*|was killed by .+ using magic|was killed by .+ using .+|froze to death|was frozen to death by .+|was slain by.+|was stung to death.*|was obliterated by a sonically-charged shriek.*|was shot by .+|was pummeled by .+|was fireballed by .+|was shot by a skull from .+|starved to death.*|suffocated in a wall.*|was squished too much|was squashed by .+|left the confines of this world.*|was poked to death by a sweet berry bush.*|was killed while trying to hurt .+|was killed by .+ while trying to hurt .+|was impaled by .+|fell out of the world|didn\'t want to live in the same world as .+|withered away.*|died.*|was killed|didn\'t want to live as .+|was killed by even more magic)|death\.fell\.accident\.water)/;

/**
 * Match index.
 */
export const DEATH_MESSAGE_KEYS = {
  FULL: 0,

  DEATH_MESSAGE: 1,
  
  PLAYER: 2,

  DEATH_WITHOUT_PLAYER: 3,
} as Record<string, number>;
