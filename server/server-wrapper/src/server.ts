// Packages
import {
  connection,
  IUtf8Message,
  Message,
  request,
  server as WebSocketServer,
} from 'websocket';
import { ScriptServer } from '@scriptserver/core';

// Local Imports
import {
  Achievement,
  AchievementEvent,
  Chat,
  ChatEvent, 
  Login,
  LoginEvent,
  Logout,
  LogoutEvent,
} from './minecraft-server/responses';
import SocketResponse, { Responses } from './web-socket/responses';
import { generateMinecraftServer } from './minecraft-server';
import { generateWebSocketServer } from './web-socket/index';

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

  /**
   * Starts internal servers and event listeners.
   *
   * @param {ServerConfig} config Configuration for server instances, mostly used for testing purposes. 
   */
  constructor(config: ServerConfig = {}) {
    this.minecraftServer = 'minecraftServer' in config ? config.minecraftServer : generateMinecraftServer();
    this.websocket = 'webSocketServer' in config ? config.webSocketServer : generateWebSocketServer('webSocketPort' in config ? config.webSocketPort : undefined);

    // Adding websocket event listeners.
    this.websocket.on('request', (request: request) => this.handleRequest(request));
    
    // Adding minecraft event listeners.
    this.minecraftServer.javaServer.on('login', (event: LoginEvent) => this.handleLogin(event));
    this.minecraftServer.javaServer.on('logout', (event: LogoutEvent) => this.handleLogout(event));
    this.minecraftServer.javaServer.on('chat', (event: ChatEvent) => this.handleChat(event));
    this.minecraftServer.javaServer.on('achievement', (event: AchievementEvent) => this.handleAchievement(event));

    this.ready = true;
  }

  /**
   * Starts internal servers.
   */
  start(): void {
    this.minecraftServer.start();
  }

  /**
   * Stops internal servers.
   */
  stop(): void {
    this.minecraftServer.stop();
    this.websocket.closeAllConnections();
    this.websocket.shutDown();
  }

  /**
   * Handles incoming websocket connection requests.
   *
   * @param {request} request Websocket request.
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
        const messageType: SocketResponse = responses[data.type];
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
    Login.execute(this.minecraftServer, this.socketConnection as connection, [ event ]);
  }

  /**
   * Handles player logout event from the minecraft server.
   *
   * @param {LogoutEvent} event The logout event.
   */
  handleLogout(event: LogoutEvent): void {
    Logout.execute(this.minecraftServer, this.socketConnection as connection, [ event ]);
  }

  /**
   * Handles player chat event from the minecraft server.
   *
   * @param {ChatEvent} event The chat event.
   */
  handleChat(event: ChatEvent): void {
    Chat.execute(this.minecraftServer, this.socketConnection as connection, [ event ]);
  }

  /**
   * Handles player achievement event from the minecraft server.
   *
   * @param {AchievementEvent} event The achievement event.
   */
  handleAchievement(event: AchievementEvent): void {
    Achievement.execute(this.minecraftServer, this.socketConnection as connection, [ event ]);
  }

  /**
   * Handles the close of a websocket connection.
   * This event means the discord bot has gone offline while a server remains up. This would be catastrophic?
   *
   * @param {number} reasonCode Reason for close.
   * @param {string} description Reason for close.
   */
  handleClose(reasonCode: number, description: string): void {
    console.log(`Connection Error ${reasonCode}: Connection with Discord Bot has closed unexpectedly, ${description}`);
  }
}
