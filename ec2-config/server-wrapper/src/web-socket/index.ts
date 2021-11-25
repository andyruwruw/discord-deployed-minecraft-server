// Packages
import http from 'http';
import { server as WebSocketServer } from 'websocket';

// Local Imports
import { WEBSOCKET_PORT } from '../config/environment';

/**
 * Creates and starts a new websocket server.
 *
 * @returns {WebSocketServer}
 */
export const generateWebSocketServer = (): WebSocketServer => {
  // Creates http server for websocket.
  const server = http.createServer();

  // Start the server.
  server.listen(parseInt(WEBSOCKET_PORT as string, 10), () => {
    console.log(`Websocket server listening on port ${WEBSOCKET_PORT}`);
  });

  // Creates an instance of a websocket server for two way communication.
  return new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  });
};
