// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { ServerResponse } from './response';

/**
 * Returns position of a player back to discord bot.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {string} playerName Name of the player.
 */
const callback = async (minecraftServer: ScriptServer, socketConnection: connection, playerName: string) => {
  try {
    if (await minecraftServer.rconConnection.util.isOnline(playerName)) {
      const data = await minecraftServer.rconConnection.util.getLocation(playerName);

      return await socketConnection.send(JSON.stringify({
        type: 'player-position',
        username: playerName,
        online: true,
        location: data,
      }));
    }

    return await socketConnection.send(JSON.stringify({
      type: 'player-position',
      username: playerName,
      online: false,
      location: null,
    }));
  } catch (error) {
    throw error;
  }
};

export const PlayerPosition = new ServerResponse('get-player-position', callback);