// Packages
import {
  Config,
  DeepPartial,
  ScriptServer,
} from '@scriptserver/core';
import { useEssentials } from '@scriptserver/essentials';
import { useEvent } from '@scriptserver/event';
import { useUtil } from '@scriptserver/util';
import { useCommand } from '@scriptserver/command';

// Local Imports
import {
  MINECRAFT_ARGS,
  RCON_HOST,
} from '../config';
import { Environment } from '../helpers/environment';

/**
 * Maintains the minecraft.
 */
export class MincraftServer {
  /**
   * Internal minecraft server.
   */
  server: ScriptServer;

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
    if (!this.server) {
      await this._createServer();
    }

    await this.server.start();
  }

  /**
   * Stops the server.
   */
  async stop(): Promise<void> {
    if (this.server) {
      await this.server.stop();
    }
  }

  /**
   * Creates the server instance.
   */
  _createServer(): void {
    this.server = new ScriptServer(this._generateServerConfig());

    useEssentials(this.server);
    useEvent(this.server.javaServer);
    useCommand(this.server.javaServer);
    useUtil(this.server.rconConnection);

    this._assignListeners();
  }

  /**
   * Sets event listeners for internal servers.
   */
  _assignListeners(): void {
    (this.server as ScriptServer).javaServer.on('start', () => this._handleStart());
    (this.server as ScriptServer).javaServer.on('stop', () => this._handleStop());
    (this.server as ScriptServer).javaServer.on('chat', (event: MinecraftChatEvent) => this._handleChat(event));
    (this.server as ScriptServer).javaServer.on('login', (event: MinecraftLoginEvent) => this._handleLogin(event));
    (this.server as ScriptServer).javaServer.on('logout', (event: MinecraftLogoutEvent) => this._handleLogout(event));
    (this.server as ScriptServer).javaServer.on('achievement', (event: MinecraftAchievementEvent) => this._handleAchievement(event));
    (this.server as ScriptServer).javaServer.on('console', (message: string) => this._handleConsole(message));
  }

  /**
   * Generates a minecraft server config.
   *
   * @returns {DeepPartial<Config>} Minecraft server config.
   */
  _generateServerConfig(): DeepPartial<Config> {
    return {
      javaServer: {
        path: Environment.getServerJarDirectory(),
        jar: Environment.getServerJarName(),
        args: MINECRAFT_ARGS,
      },
      rconConnection: {
        host: RCON_HOST,
        port: Environment.getRconPort(),
        password: Environment.getRconPassword(),
      },
      essentials: {
        starterKit: {
          enabled: false,
        },
        home: {
          enabled: false,
        },
        warp: {
          enabled: false,
        },
        tpa: false,
        back: false,
        day: {
          enabled: false,
        },
        night: {
          enabled: false,
        },
        weather: {
          enabled: false,
        },
      },
    }
  }

  /**
   * Handles the server starting.
   */
  _handleStart(): void {

  }

  /**
   * Handles the server stopping.
   */
  _handleStop(): void {

  }

  /**
   * Handles a player giving a chat event.
   *
   * @param {MinecraftChatEvent} event The chat event.
   */
  _handleChat(event: MinecraftChatEvent): void {

  }

  /**
   * Handles a player logging in.
   *
   * @param {MinecraftLoginEvent} event The login event.
   */
  _handleLogin(event: MinecraftLoginEvent): void {

  }

  /**
   * Handles a player logging out.
   *
   * @param {MinecraftLogoutEvent} event The logout event.
   */
  _handleLogout(event: MinecraftLogoutEvent): void {

  }

  /**
   * Handles a player getting an achievement.
   *
   * @param {MincraftAchievementEvent} event The achivement event.
   */
  _handleAchievement(event: MinecraftAchievementEvent): void {

  }

  /**
   * Handles a server console message.
   *
   * @param {string} message Message from console. 
   */
  _handleConsole(message: string): void {

  }
}
