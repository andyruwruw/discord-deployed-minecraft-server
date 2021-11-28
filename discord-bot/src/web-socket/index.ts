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
export const generateWebSocketClient = () => {
  const client = new WebSocketClient();

  client.connect(`ws://${SERVER_IP}:${SERVER_WEBSOCKET_PORT}/`, 'echo-protocol');

  return client;
};
