// Packages
import { client as WebSocketClient } from 'websocket';

/**
 * Generates a new websocket client for connecting to server.
 *
 * @returns {WebSocketClient} Websocket Client.
 */
export const generateWebSocketClient = (port: number | undefined = undefined): WebSocketClient => {
  return new WebSocketClient();
};

/**
 * Connects the websocket client with a server.
 *
 * @param client Websocket client.
 * @param ip Server IP address.
 * @param port Server websocket port.
 */
export const connectToServer = (
  client: WebSocketClient,
  ip: string,
  port: number | undefined = 3000) => {
  client.connect(`ws://${ip}:${port}`);
};
