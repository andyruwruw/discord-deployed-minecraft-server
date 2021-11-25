// Packages
import { JavaServer, ScriptServer } from "@scriptserver/core";
import { connection, IUtf8Message, Message, request, server as WebSocketServer } from 'websocket';

// Local Imports
import { generateMinecraftServer } from "./minecraft-server";
import websocket from './web-socket/index';
import ServerResponse, { Responses } from "./web-socket/responses";
import { playerLogin, playerLogout, getCurrentPlaytime } from "./minecraft-server/helpers/active-players";
import { handleLoginEvent } from "./minecraft-server/responses";

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
    
    // Adding MC event listeners
    this.minecraftServer.javaServer.on('login', this.handleLogin);
    this.minecraftServer.javaServer.on('logout', this.handleLogout);
    this.minecraftServer.javaServer.on('chat', this.handleChat);
    this.minecraftServer.javaServer.on('achievement', this.handleAchievement);
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
      this.handleClose(reasonCode, description);
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
   * Handles player login event from the minecraft server.
   *
   * @param {LoginEvent} event The login event.
   */
  handleLogin(event: LoginEvent) {
    handleLoginEvent(event);
  }

  /**
   * Handles player logout event from the minecraft server.
   *
   * @param {LogoutEvent} event The logout event.
   */
  handleLogout(event: LogoutEvent) {
    const millisecondsPlayed = playerLogout(event.player);

    console.log(`${event.player} played for ${millisecondsPlayed} milliseconds`);
  }

  /**
   * Handles player chat event from the minecraft server.
   *
   * @param {ChatEvent} event The chat event.
   */
  handleChat(event: ChatEvent) {
    console.log(event.player + " said " + event.message);
  }

  /**
   * Handles player achievement event from the minecraft server.
   *
   * @param {AchievementEvent} event The achievement event.
   */
  handleAchievement(event: AchievementEvent) {
    console.log(event.player + " achieved " + event.achievement);
  }

  /**
   * Handles the close of a websocket connection.
   * This event means the discord bot has gone offline while a server remains up. This would be catastrophic?
   *
   * @param {number} reasonCode Reason for close.
   * @param {string} description Reason for close.
   */
  handleClose(reasonCode: number, description: string) {
    console.log(reasonCode, description);
  }
}
