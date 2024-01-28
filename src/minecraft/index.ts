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
  DEATH_MESSAGE,
  DEATH_MESSAGE_KEYS,
  EULA_CONSOLE_REGEX,
  MINECRAFT_ARGS,
  NOT_PLAYER_MESSAGE,
  RCON_HOST,
} from '../config/minecraft';
import {
  DISCORD_CHANNEL,
  DISCORD_ROLE,
} from '../config/discord';
import {
  RANK_TITLES,
  getRoleForHours,
} from '../config';
import { editServerProperties } from '../utils/edit-server-properties';
import { DiscordReferences } from '../discord/references';
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

      if (member) {
        const onlineRole = await DiscordReferences.getRole(DISCORD_ROLE.ONLINE);

        if (onlineRole) {
          await member.roles.add(onlineRole.id);
        }
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const player = await Server.Database.players.findOne({
        minecraft: event.player,
      });

      if (player) {
        await Server.Database.players.update({
          minecraft: event.player,
        }, {
          logins: player.logins + 1,
        });
      }

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
  async _handleLogout(event: MinecraftLogoutEvent): Promise<void> {
    let member;

    try {
      member = await DiscordReferences.getPlayer(
        '',
        event.player,
      );

      if (member) {
        const onlineRole = await DiscordReferences.getRole(DISCORD_ROLE.ONLINE);

        if (onlineRole) {
          await member.roles.remove(onlineRole.id);
        }
      }
    } catch (error) {
      console.log(error);
    }

    try {
      if (event.player in this.sessions) {
        const start = this.sessions[event.player];
        const duration = (Date.now() - start) / 1000 / 60 / 60;

        delete this.sessions[event.player];

        const player = await Server.Database.players.findOne({
          minecraft: event.player,
        });
  
        if (player) {
          await Server.Database.players.update({
            minecraft: event.player,
          }, {
            hours: player.hours + duration,
          });

          const highestPlayer = await Server.Database.players.find(
            {},
            {},
            {
              hours: -1,
            },
            0,
            2,
          );

          const previous = getRoleForHours(player.hours);
          const next = getRoleForHours(player.hours + duration);

          if (next !== previous) {
            const oldRank = await DiscordReferences.getRole(previous);
            const rankRole = await DiscordReferences.getRole(next);
            
            if (member && rankRole) {
              if (oldRank) {
                await member.roles.remove(oldRank.id);
              }
              
              await member.roles.add(rankRole.id);

              const broadcastChannel = await DiscordReferences.getChannel(DISCORD_CHANNEL.broadcast);

              if (broadcastChannel) {
                await broadcastChannel.send({
                  content: `${member.displayName} just ranked up to ${RANK_TITLES[next]} with ${Math.round(player.hours + duration)} hours.`,
                });
              }
            }
          }

          if (highestPlayer.length > 0
            && highestPlayer[0].minecraft === event.player
            && member) {
            const highestRank = await DiscordReferences.getRole(DISCORD_ROLE.MOST_PLAYTIME);

            if (highestRank) {
              await member.roles.add(highestRank.id);

              if (highestPlayer.length > 1) {
                const second = await DiscordReferences.getPlayer(highestPlayer[1].minecraft);
              
                if (second) {
                  await second.roles.remove(highestRank.id);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Handles a player getting an achievement.
   *
   * @param {MincraftAchievementEvent} event The achivement event.
   */
  async _handleAchievement(event: MinecraftAchievementEvent): Promise<void> {
    try {
      const player = await Server.Database.players.findOne({
        minecraft: event.player,
      });

      if (player) {
        await Server.Database.players.update({
          minecraft: event.player,
        }, {
          achievements: player.achievements + 1,
        });
      }

      const mostAchievements = await Server.Database.players.find(
        {},
        {},
        {
          achievements: -1,
        },
        0,
        2,
      );

      if (mostAchievements.length
        && mostAchievements[0].minecraft === event.player) {
        const member = await DiscordReferences.getPlayer(
          '',
          event.player,
        );

        const mostAchievementsRank = await DiscordReferences.getRole(DISCORD_ROLE.MOST_ACHIEVEMENTS);

        if (mostAchievementsRank && member) {
          await member.roles.add(mostAchievementsRank.id);

          if (mostAchievements.length > 1) {
            const second = await DiscordReferences.getPlayer(mostAchievements[1].minecraft);
          
            if (second) {
              await second.roles.remove(mostAchievementsRank.id);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
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

      if (NOT_PLAYER_MESSAGE.test(message)
        && DEATH_MESSAGE.test(message)) {
        const match = message.match(DEATH_MESSAGE);

        if (match) {
          const username = match[DEATH_MESSAGE_KEYS.PLAYER];

          const player = await Server.Database.players.findOne({
            minecraft: username,
          });

          if (player) {
            await Server.Database.players.update({
              minecraft: username,
            }, {
              deaths: player.deaths + 1,
            });
          }

          const mostDeaths = await Server.Database.players.find(
            {},
            {},
            {
              deaths: -1,
            },
            0,
            2,
          );
    
          if (mostDeaths.length
            && mostDeaths[0].minecraft === username) {
            const member = await DiscordReferences.getPlayer(
              '',
              username,
            );
    
            const mostDeathsRank = await DiscordReferences.getRole(DISCORD_ROLE.MOST_DEATHS);
    
            if (mostDeathsRank && member) {
              await member.roles.add(mostDeathsRank.id);
    
              if (mostDeaths.length > 1) {
                const second = await DiscordReferences.getPlayer(mostDeaths[1].minecraft);
              
                if (second) {
                  await second.roles.remove(mostDeathsRank.id);
                }
              }
            }
          }
        }
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
