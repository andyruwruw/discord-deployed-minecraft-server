// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { SocketResponse } from './response';

export const TYPE = 'player-position';

/**
 * Returns position of a player back to discord bot.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {string} playerName Name of the player.
 */
const callback = async (minecraftServer: ScriptServer, socketConnection: connection, playerName: string) => {
  if (await minecraftServer.rconConnection.util.isOnline(playerName)) {
    const data = await minecraftServer.rconConnection.util.getLocation(playerName);

    return socketConnection.send(JSON.stringify({
      type: TYPE,
      username: playerName,
      online: true,
      location: data,
    }));
  }

  return socketConnection.send(JSON.stringify({
    type: TYPE,
    username: playerName,
    online: false,
    location: null,
  }));
};

export const PlayerPosition = new SocketResponse(TYPE, callback);