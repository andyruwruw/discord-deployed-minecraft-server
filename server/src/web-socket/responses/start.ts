// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { SocketResponse } from './response';
import { generateMinecraftServer } from '../../minecraft-server';

export const TYPE = 'start';

/**
 * Starts the minecraft server.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {Array<any>} args Command as string to be run.
 */
const callback = async (
  minecraftServer: ScriptServer,
  socketConnection: connection,
  command: string): Promise<void> => {
  if (minecraftServer === null) {
    minecraftServer = await generateMinecraftServer();
  }
};

export const Start = new SocketResponse(TYPE, callback);
