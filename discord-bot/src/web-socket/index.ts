import { client as WebSocketClient } from 'websocket';

/**
 * Generates a new websocket client for connecting to server.
 *
 * @returns {WebSocketClient} Websocket Client
 */
export const generateWebSocketClient = () => {
  const client = new WebSocketClient();
  return client;
};
