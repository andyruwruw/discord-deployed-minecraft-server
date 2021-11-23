// Packages
import http from 'http';
import { server as WebSocketServer } from 'websocket';

// Creates http server for websocket.
const server = http.createServer();

// Creates an instance of a websocket server for two way communication.
const websocket = new WebSocketServer({
  httpServer: server,
  disableNagleAlgorithm: false,
});

export default websocket;
