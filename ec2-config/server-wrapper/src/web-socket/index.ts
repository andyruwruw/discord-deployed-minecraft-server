// Packages
import http from 'http';
import { waitForServerState } from 'tests/utils/mock-web-socket-client';
import { server as WebSocketServer } from 'websocket';

// Local Imports
import { WEBSOCKET_PORT } from '../config';

/**
 * Creates and starts a new websocket server.
 *
 * @returns {WebSocketServer}
 */
export const generateWebSocketServer = async (port: number | undefined = undefined): Promise<WebSocketServer> => {
  let server: http.Server | null = null;
  const resultingPort = port != undefined ? port : parseInt(WEBSOCKET_PORT as string, 10);
  
  return waitForServerToStart(server, resultingPort);
};

/**
 * Starts server and keeps checking if it is ready.
 *
 * @param {http.Server | null} server Http server for websocket server.
 * @param {number} port Desired port the server should run on.
 * @returns {WebSocketServer} The server resulting.
 */
const waitForServerToStart = async (server: http.Server | null, port: number): Promise<WebSocketServer> => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (server === null) {
        // Creates http server for websocket.
        server = http.createServer();

        // Start the server.
        server.listen(port, () => {
          console.log(`Websocket server listening on port ${port}`);

          // Creates an instance of a websocket server for two way communication.
          const webSocketServer = new WebSocketServer({
            httpServer: server as http.Server,
            autoAcceptConnections: false,
          });

          resolve(webSocketServer);
        });
      }

      waitForServerToStart(server, port);
    }, 5);
  }); 
};
