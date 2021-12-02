// Packages
import { Client } from 'discord.js';
import { connection as WebSocketConnection } from 'websocket';

// Local Imports
import {
  WebSocketLocation,
  WebSocketMessageData,
  WebSocketPlayerPositionMessage,
} from '../types';
import { WebSocketCallback } from './callback';
import { Database } from '../../database/database';

/**
 * Database Instance
 */
 const database = new Database();

/**
 * Name of the websocket response.
 */
export const NAME = 'create-home-resolution';

/**
 * Callback run on response.
 *
 * @param {Message} message The message that was sent.
 * @param {Client} client The Discord bot client.
 * @param {WebSocketConnection} connection Connection to guild's server.
 * @param {Database} database Connection to the bot's database.
 */
const callback = async (
    message: WebSocketMessageData,
    client: Client,
    connection: WebSocketConnection,
): Promise<any> => {
    const {
      online,
      location,
      context,
    } = message as WebSocketPlayerPositionMessage;

    const {
      guildId,
      userId,
      isDm,
      channelId,
      args,
    } = context;

    if (online) {
      const {
        x,
        y,
        z,
        dimention
      } = location as WebSocketLocation;

      return await database.createBase(
        guildId,
        [ userId ],
        x,
        y,
        z,
        dimention,
        'name' in args ? args.name : undefined,
      );
    } else {
      return null;
    }
};

export const CreateHomeResolution = new WebSocketCallback(
    NAME,
    callback,
);
