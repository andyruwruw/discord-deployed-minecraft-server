// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { ServerResponse } from './response';

/**
 * Runs a command string on the server terminal.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {string} command Command as string to be run.
 */
const callback = async (minecraftServer: ScriptServer, socketConnection: connection, command: string) => {
  try {
    minecraftServer.javaServer.send(command)
  } catch (error) {
    throw error;
  }
};

export const Command = new ServerResponse('command', callback);
