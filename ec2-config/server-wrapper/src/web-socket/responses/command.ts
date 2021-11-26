// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { SocketResponse } from './response';

export const TYPE = 'command';

/**
 * Runs a command string on the server terminal.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {Array<any>} args Command as string to be run.
 */
const callback = async (minecraftServer: ScriptServer, socketConnection: connection, command: string) => {
  try {
    minecraftServer.javaServer.send(command)
  } catch (error) {
    throw error;
  }
};

export const Command = new SocketResponse(TYPE, callback);
