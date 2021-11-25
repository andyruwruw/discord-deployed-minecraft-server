// Packages
import http from 'http';
import { server as WebSocketServer } from 'websocket';

// Local Imports
import { WEBSOCKET_PORT } from '../config';

/**
 * Creates and starts a new websocket server.
 *
 * @returns {WebSocketServer}
 */
export const generateWebSocketServer = (port: number | undefined): WebSocketServer => {
  // Creates http server for websocket.
  const server = http.createServer();

  const resultingPort = port != undefined ? port : parseInt(WEBSOCKET_PORT as string, 10);

  // Start the server.
  server.listen(resultingPort, () => {
    console.log(`Websocket server listening on port ${resultingPort}`);
  });

  // Creates an instance of a websocket server for two way communication.
  return new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  });
};
