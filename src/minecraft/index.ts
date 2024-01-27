// Packages
import {
  Config,
  DeepPartial,
  ScriptServer,
} from '@scriptserver/core';
import { useEssentials } from '@scriptserver/essentials';
import { useEvent } from '@scriptserver/event';
import { useUtil } from '@scriptserver/util';
import { CommandEvent, useCommand } from '@scriptserver/command';
import { Channel, TextChannel } from 'discord.js';

// Local Imports
import {
  EULA_CONSOLE_REGEX,
  MINECRAFT_ARGS,
  RCON_HOST,
} from '../config/minecraft';
import { editServerProperties } from '../utils/edit-server-properties';
import { approveEula } from '../utils/edit-eula';
import { Environment } from '../helpers/environment';
import { Server } from '../';

// Types
import { 
  MinecraftChatEvent,
  MinecraftLoginEvent,
  MinecraftLogoutEvent,
  MinecraftAchievementEvent,
} from '../types';
import { DiscordReferences } from 'src/discord/references';
import { DISCORD_CHANNEL } from 'src/config/discord';

/**
 * Maintains the minecraft.
 */
export class MinecraftServer {
  /**
   * Internal minecraft server.
   */
  server: ScriptServer | null;

  /**
   * Active sessions.
   */
  sessions: Record<string, number>;

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

    await (this.server as ScriptServer).start();
  }

  /**
   * Stops the server.
   */
  async stop(): Promise<void> {
    if (this.server) {
      await this.server.stop();

      this.server = null;
    }
  }

  /**
   * Runs a command on the server.
   *
   * @param {string} command Command to run.
   */
  async runCommand(command: string): Promise<void> {
    try {
      this.server?.javaServer.send(command);
    } catch (error) {
      console.log(error);
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
        path: __dirname,
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
  async _handleLogin(event: MinecraftLoginEvent): Promise<void> {
    try {
      const member = await DiscordReferences.getPlayer(
        '',
        event.player,
      );

      const player = await Server.Database.players.findOne({
        minecraft: event.player,
      });

      this.sessions[event.player] = Date.now();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Handles a player logging out.
   *
   * @param {MinecraftLogoutEvent} event The logout event.
   */
  _handleLogout(event: MinecraftLogoutEvent): void {
    try {
      console.log(event.player);

      const start = this.sessions[event.player];
      const duration = Date.now() - start;

      delete this.sessions[event.player];
    } catch (error) {
      console.log(error);
    }
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
  async _handleConsole(message: string): Promise<void> {
    try {
      if (!message.length) {
        return;
      }
  
      if (message.match(EULA_CONSOLE_REGEX) !== null) {
        this._handleFirstBoot();
      }

      const channel = await DiscordReferences.getChannel(DISCORD_CHANNEL.CONSOLE);
  
      if (channel) {
        (channel as TextChannel).send({
          content: message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Handles server first start and EULA approval.
   */
  async _handleFirstBoot(): Promise<void> {
    this.stop();

    const promises = [
      approveEula(),
      editServerProperties(),
    ];

    await Promise.all(promises);

    this.start();
  }
}
