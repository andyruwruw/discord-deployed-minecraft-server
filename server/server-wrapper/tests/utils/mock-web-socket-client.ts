// Packages
import WebSocket from 'ws';

// Local Imports
import { Server } from '../../src/server';
import { WEBSOCKET_PORT } from '../../src/config';

export const waitForSocketState = (socket: WebSocket, state: number): Promise<void> => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (socket.readyState === state) {
        resolve();
      } else {
        waitForSocketState(socket, state).then(resolve);
      }
    }, 5);
  });
};

export const waitForServerState = (server: Server): Promise<void> => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (server.ready) {
        resolve();
      } else {
        waitForServerState(server).then(resolve);
      }
    }, 5);
  });
};

export const generateWebSocketClient = (port: number | undefined = undefined): WebSocket => {
  const resultingPort = port != undefined ? port : WEBSOCKET_PORT;

  console.log(`Client Port: ${resultingPort}`);
  return new WebSocket(`ws://localhost:${resultingPort}`);
};
