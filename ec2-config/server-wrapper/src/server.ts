// Packages
import { ScriptServer } from '@scriptserver/core';
import {
  connection,
  IUtf8Message,
  Message,
  request,
  server as WebSocketServer,
} from 'websocket';

// Local Imports
import { generateMinecraftServer } from './minecraft-server';
import { generateWebSocketServer } from './web-socket/index';
import ServerResponse, { Responses } from './responses';

/**
 * Maintains the minecraft and websocket server instances and their interactions.
 */
export class Server {
  minecraftServer: ScriptServer;
  websocket: WebSocketServer;
  socketConnection?: connection;

  constructor(config: ServerConfig = {}) {
    this.minecraftServer = 'overrideMinecraftServer' in config ? config.overrideMinecraftServer : generateMinecraftServer();
    this.websocket = 'overrideWebSocketServer' in config ? config.overrideWebSocketServer : generateWebSocketServer();

    // Adding websocket event listeners.
    this.websocket.on('request', this.handleRequest);
  }

  /**
   * Starts the Minecraft server.
   */
  start() {
    this.minecraftServer.start();
  }

  /**
   * Stops the minecraft server.
   */
  stop() {
    this.minecraftServer.stop();
    // this.socketConnection?.close(503, 'Server Stopped');
  }

  /**
   * Handles incoming websocket connection requests.
   *
   * @param request 
   */
  handleRequest(request: request) {
    this.socketConnection = request.accept(undefined, request.origin);
    
    this.socketConnection.on('message', this.handleMessage);
  
    this.socketConnection.on('close', this.handleClose);
  }

  /**
   * Handles websocket messages.
   *
   * @param message 
   */
  handleMessage(message: Message) {
    try {
      const data = JSON.parse((message as IUtf8Message).utf8Data);
      const responses = Responses();

      if (data.type in responses) {
        const messageType: ServerResponse = responses[data.type];
        messageType.execute(this.minecraftServer, this.socketConnection as connection, data.args);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Handles the close of a websocket connection.
   * This event means the discord bot has gone offline while a server remains up. This would be catastrophic?
   *
   * @param reasonCode 
   * @param description 
   */
  handleClose(reasonCode: any, description: any) {
    console.log(reasonCode, description);
  }
}
