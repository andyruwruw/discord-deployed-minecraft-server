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
import ServerResponse, { Responses } from './web-socket/responses';
import { playerLogout } from './minecraft-server/helpers/active-players';
import { handleLoginEvent, LoginEvent, ChatEvent, AchievementEvent, LogoutEvent } from './minecraft-server/responses';

export interface ServerConfig {
  minecraftServer?: any,
  webSocketServer?: any,
  webSocketPort?: number,
};

/**
 * Maintains the minecraft and websocket server instances and their interactions.
 */
export class Server {
  ready: boolean = false;
  minecraftServer: ScriptServer;
  websocket: WebSocketServer;
  socketConnection?: connection;

  constructor(config: ServerConfig = {}) {
    this.minecraftServer = 'minecraftServer' in config ? config.minecraftServer : generateMinecraftServer();
    this.websocket = 'webSocketServer' in config ? config.webSocketServer : generateWebSocketServer('webSocketPort' in config ? config.webSocketPort : undefined);

    // Adding websocket event listeners.
    this.websocket.on('request', (request: request) => this.handleRequest(request));
    
    // Adding MC event listeners
    this.minecraftServer.javaServer.on('login', (event: LoginEvent) => this.handleLogin(event));
    this.minecraftServer.javaServer.on('logout', (event: LogoutEvent) => this.handleLogout(event));
    this.minecraftServer.javaServer.on('chat', (event: ChatEvent) => this.handleChat(event));
    this.minecraftServer.javaServer.on('achievement', (event: AchievementEvent) => this.handleAchievement(event));

    this.ready = true;
  }

  /**
   * Starts the Minecraft server.
   */
  start(): void {
    this.minecraftServer.start();
  }

  /**
   * Stops the minecraft server.
   */
  stop(): void {
    this.minecraftServer.stop();
    this.websocket.closeAllConnections();
    this.websocket.shutDown();
  }

  /**
   * Handles incoming websocket connection requests.
   *
   * @param request 
   */

   handleRequest(request: request): void {
    this.socketConnection = request.accept(undefined, request.origin);

    this.socketConnection.on('message', (message: Message) => this.handleMessage(message));
  
    this.socketConnection.on('close', (code: number, description: string) =>  this.handleClose(code, description));
  }

  /**
   * Handles websocket messages.
   *
   * @param message 
   */
  handleMessage = (message: Message): void => {
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
   * Handles player login event from the minecraft server.
   *
   * @param {LoginEvent} event The login event.
   */
  handleLogin(event: LoginEvent): void {
    handleLoginEvent(event);
  }

  /**
   * Handles player logout event from the minecraft server.
   *
   * @param {LogoutEvent} event The logout event.
   */
  handleLogout(event: LogoutEvent): void {
    const millisecondsPlayed = playerLogout(event.player);

    console.log(`${event.player} played for ${millisecondsPlayed} milliseconds`);
  }

  /**
   * Handles player chat event from the minecraft server.
   *
   * @param {ChatEvent} event The chat event.
   */
  handleChat(event: ChatEvent): void {
    console.log(event.player + ' said ' + event.message);
  }

  /**
   * Handles player achievement event from the minecraft server.
   *
   * @param {AchievementEvent} event The achievement event.
   */
  handleAchievement(event: AchievementEvent): void {
    console.log(event.player + ' achieved ' + event.achievement);
  }

  /**
   * Handles the close of a websocket connection.
   * This event means the discord bot has gone offline while a server remains up. This would be catastrophic?
   *
   * @param {number} reasonCode Reason for close.
   * @param {string} description Reason for close.
   */
  handleClose(reasonCode: number, description: string): void {
    console.log(reasonCode, description);
  }
}
