// Packages
import { ScriptServer } from "@scriptserver/core";
import { IUtf8Message, Message, request, server as WebSocketServer } from 'websocket';

// Local Imports
import { generateMinecraftServer } from "./minecraft-server";
import websocket from './web-socket/index';

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
    const connection = request.accept(undefined, request.origin);
    
    connection.on('message', this.handleMessage);
  
    connection.on('close', this.handleClose);
  }

  /**
   * Handles websocket messages.
   *
   * @param message 
   */
  handleMessage(message: Message) {
    try {
      const data = JSON.parse((message as IUtf8Message).utf8Data);

      if (data.type === 'command') {
        this.minecraftServer.javaServer.send(data.command);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Handles the close of a websocket connection.
   *
   * @param reasonCode 
   * @param description 
   */
  handleClose(reasonCode: any, description: any) {
    console.log(reasonCode, description);
  }
}
