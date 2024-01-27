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
