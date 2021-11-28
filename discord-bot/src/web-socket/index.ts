// Packages
import { client as WebSocketClient } from 'websocket';

// Local Imports
import {
  SERVER_IP,
  SERVER_WEBSOCKET_PORT,
} from '../config';

/**
 * Generates a new websocket client for connecting to server.
 *
 * @returns {WebSocketClient} Websocket Client.
 */
export const generateWebSocketClient = (port: number | undefined = undefined) => {
  const client = new WebSocketClient();

  const finalPort = port != undefined ? port : parseInt(SERVER_WEBSOCKET_PORT as string, 10);

  client.connect(`ws://${SERVER_IP}:${finalPort}/`, 'echo-protocol');

  return client;
};
