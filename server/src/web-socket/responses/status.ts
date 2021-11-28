// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { SocketResponse } from './response';

export const TYPE = 'status';

/**
 * Returns status of the server back to discord bot.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 */
const callback = async (
  minecraftServer: ScriptServer,
  socketConnection: connection): Promise<void> => {
  const data = await minecraftServer.rconConnection.util.getOnline();

  await socketConnection.send(JSON.stringify({
    type: TYPE,
    online: data.online,
    players: data.players,
  }));
};

export const Status = new SocketResponse(TYPE, callback);
