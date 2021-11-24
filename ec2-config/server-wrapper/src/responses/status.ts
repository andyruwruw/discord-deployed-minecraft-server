// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { ServerResponse } from './response';

/**
 * Returns status of the server back to discord bot.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 */
const callback = async (minecraftServer: ScriptServer, socketConnection: connection) => {
  try {
    const data = await minecraftServer.rconConnection.util.getOnline();

    await socketConnection.send(JSON.stringify({
      type: 'status',
      online: data.online,
      players: data.players,
    }));
  } catch (error) {
    throw error;
  }
};

export const Status = new ServerResponse('status', callback);
