// Packages
import { ScriptServer } from "@scriptserver/core";
import { server as WebSocketServer } from 'websocket';

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
  handleRequest(request: any) {
    const connection = request.accept(undefined, request.origin);
    
    connection.on('message', this.handleMessage);
  
    connection.on('close', this.handleClose);
  }

  /**
   * Handles websocket messages.
   *
   * @param message 
   */
  handleMessage(message: any) {
    try {
      const data = JSON.parse(message.utf8Data);

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
