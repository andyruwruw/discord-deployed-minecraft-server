// Packages
import dotenv from 'dotenv';

dotenv.config();

// Environmental Variables
export const RCON_PASSWORD = process.env.RCON_PASSWORD;
export const RCON_PORT = process.env.RCON_PORT;
export const SERVER_JAR_DIR = process.env.SERVER_JAR_DIR;
export const SERVER_JAR_NAME = process.env.SERVER_JAR_NAME;
export const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT;

// Java Minecraft arguments for server start.
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
];
