// Packages
import { ScriptServer } from '@scriptserver/core';
import { useEssentials } from '@scriptserver/essentials';
import { useEvent } from '@scriptserver/event';
import { useUtil } from '@scriptserver/util';
import { useCommand } from '@scriptserver/command';

// Local Imports
import {
  MinecraftConsoleHandler,
  PlayerAchievementHandler,
  PlayerLoginHandler,
  PlayerLogoutHandler,
  ServerStartHandler,
} from '../handlers';
import { ServerProperties } from './properties';
import { Monitor } from '../helpers/monitor';

// Types
import { 
  MinecraftLoginEvent,
  MinecraftLogoutEvent,
  MinecraftAchievementEvent,
} from '../types/minecraft';

/**
 * Maintains the minecraft.
 */
export class MinecraftServer {
  /**
   * Internal minecraft server.
   */
  _server: ScriptServer | null;

  /**
   * Instantiates a new minecraft server wrapper.
   */
  constructor() {
    this._createServer();
  }

  /**
   * Starts the server.
   */
  async start(): Promise<void> {
    if (!this._server) {
      await this._createServer();
    }

    await (this._server as ScriptServer).start();
  }

  /**
   * Stops the server.
   */
  async stop(): Promise<void> {
    if (this._server) {
      await this._server.stop();

      this._server = null;
    }
  }

  /**
   * Runs a command on the server.
   *
   * @param {string} command Command to run.
   */
  async runCommand(command: string): Promise<void> {
    try {
      if (this._server) {
        await this._server.javaServer.send(command);
      }
    } catch (error) {
      await Monitor.trace(
        MinecraftServer,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Creates the server instance.
   */
  async _createServer(): Promise<void> {
    await ServerProperties.LoadSettings();

    // Create new script server.
    this._server = new ScriptServer(ServerProperties.GenerateServerConfig());

    // Use all libraries.
    useEssentials(this._server);
    useEvent(this._server.javaServer);
    useCommand(this._server.javaServer);
    useUtil(this._server.rconConnection);

    // Assign listeners.
    this._assignListeners();
  }

  /**
   * Sets event listeners for internal servers.
   */
  _assignListeners(): void {
    // Server start.
    (this._server as ScriptServer).javaServer.on(
      'start',
      () => (ServerStartHandler.execute('')),
    );
    // Player login.
    (this._server as ScriptServer).javaServer.on(
      'login',
      (event: MinecraftLoginEvent) => (PlayerLoginHandler.execute(event)),
    );
    // Player logout.
    (this._server as ScriptServer).javaServer.on(
      'logout',
      (event: MinecraftLogoutEvent) => (PlayerLogoutHandler.execute(event)),
    );
    // Player achievement.
    (this._server as ScriptServer).javaServer.on(
      'achievement',
      (event: MinecraftAchievementEvent) => (PlayerAchievementHandler.execute(event)),
    );
    // Server console.
    (this._server as ScriptServer).javaServer.on(
      'console',
      (message: string) => (MinecraftConsoleHandler.execute(message)),
    );

    // Unused.
    // (this._server as ScriptServer).javaServer.on('stop', () => this._handleStop());
    // (this._server as ScriptServer).javaServer.on('chat', (event: MinecraftChatEvent) => this._handleChat(event));
  }
}
