// Packages
import { ScriptServer } from "@scriptserver/core";
import { connection, IUtf8Message, Message, request, server as WebSocketServer } from 'websocket';

// Local Imports
import { generateMinecraftServer } from "./minecraft-server";
import websocket from './web-socket/index';
import ServerResponse, { Responses } from "./responses";

/**
 * Maintains the minecraft and websocket server instances and their interactions.
 */
export class Server {
  minecraftServer: ScriptServer;
  websocket: WebSocketServer;

  constructor() {
    this.minecraftServer = generateMinecraftServer();
    this.websocket = websocket;

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
   * Handles incoming websocket connection requests.
   *
   * @param request 
   */
  handleRequest(request: request) {
    const socketConnection = request.accept(undefined, request.origin);
    
    socketConnection.on('message', (message: Message) => {
      this.handleMessage(socketConnection, message);
    });
  
    socketConnection.on('close', (reasonCode: any, description: any) => {
      this.handleClose(socketConnection, reasonCode, description);
    });
  }

  /**
   * Handles websocket messages.
   *
   * @param message 
   */
  handleMessage(socketConnection: connection, message: Message) {
    try {
      const data = JSON.parse((message as IUtf8Message).utf8Data);
      const responses = Responses();

      if (data.type in responses) {
        const messageType: ServerResponse = responses[data.type];
        messageType.execute(this.minecraftServer, socketConnection, data.args);
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
  handleClose(socketConnection: connection, reasonCode: any, description: any) {
    console.log(reasonCode, description);
  }
}
