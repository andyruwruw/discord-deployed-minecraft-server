// Packages
import {
  Client,
  ClientOptions,
  GuildMember,
  Interaction,
  MessageReaction,
  PartialGuildMember,
  PartialMessageReaction,
  PartialUser,
  Role,
  User,
} from 'discord.js';
import {
  client as WebSocketClient,
  connection as WebSocketConnection,
  Message as WebSocketMessage,
} from 'websocket';

// Local Imports
import {
  generateWebSocketClient,
  connectToServer,
} from '../web-socket';
import {
  DATABASE_CONNECTION_SUCCESS,
  READY_RESPONSE_STRING,
} from '../config';
import {
  Command,
  CommandList,
} from '../copper-bot/commands';
import { Database } from '../database/database';
import { getDatabase } from '../database';
import { logger } from './logger';
import { IGuild } from '../database/types';
import { reduceInteraction } from './commands/helpers/reduce-interaction';
import { PendingCommand } from './pending-command';

/**
 * Our little buddy.
 */
export class CopperBot extends Client {
  /**
   * Websocket client.
   */
  websocket: WebSocketClient;

  /**
   * Websocket connections to servers.
   */
  connections: Record<string,WebSocketConnection>;

  /**
   * Database connection and queries.
   */
  database: Database;

  /**
   * Guilds the bot is connected to.
   */
  databaseGuilds: Array<IGuild> = [];

  /**
   * Whether the Discord bot is connected to Discord.
   */
  ready: boolean = false;

  /**
   * List of pending commands.
   */
  pending: Array<PendingCommand> = [];

  /**
   * Instantiates the Copper Bot, calling discord.js' Client constructor.
   *
   * @param {ClientOptions} options Options for the client.
   */
  constructor(options: ClientOptions) {
    super(options);

    this.database = getDatabase();
    this.websocket = generateWebSocketClient();
    this.connections = {};
    
    // Discord Events
    this.on('ready', () => this.handleReady());
    this.on('error', (error: Error) => this.handleError(error));
    this.on('interactionCreate', (interaction: Interaction) => this.handleInteraction(interaction));
    this.on('guildMemberAdd', (member: GuildMember) => this.handleGuildMemberAdded(member));
    this.on('guildMemberRemove', (member: GuildMember | PartialGuildMember) => this.handleGuildMemberRemove(member));
    this.on('messageReactionAdd', (messageReaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => this.handleMessageReactionAdd(messageReaction, user));
    this.on('roleCreate', (role: Role) => this.handleRoleCreate(role));

    // Server Events
    this.websocket.on('connect', (connection: WebSocketConnection) => this.handleConnect(connection));
    this.websocket.on('connectFailed', (error: Error) => this.handleConnectFailed(error));
    this.connectToDatabase();
  }

  /**
   * Connects bot to the database.
   */
  async connectToDatabase() {
    await this.database.connect();

    if (await this.database.isConnected()) {
      logger(this, DATABASE_CONNECTION_SUCCESS);
      
      this.connectToServers();

      if (this.ready) {
        this.registerCommands();
      }
    }
  }

  /**
   * Connects bot to guild servers.
   */
  async connectToServers() {
    this.databaseGuilds = await this.database.getGuilds();

    for (let guild of this.databaseGuilds) {
      connectToServer(
        this.websocket,
        guild.ip,
        guild.port,
      );
    }
  }

  /**
   * Handles the bot connecting to discord.
   */
  async handleReady() {
    this.ready = true;

    if (await this.database.isConnected()) {
      this.registerCommands();
    }

    logger(this, READY_RESPONSE_STRING);
  }

  /**
   * Registers slash commands with Discord.
   */
  registerCommands() {
    for (let command of CommandList) {
      const commandObject = command.create();

      this.application?.commands.create(commandObject);

      for (let databaseGuild of this.databaseGuilds) {
        const guild = this.guilds.cache.get(databaseGuild.id);

        if (guild) {
          guild.commands.create(commandObject);
        }
      }
    }
  }

  /**
   * Handles client errors.
   * 
   * @param {Error} error Error in question.
   */
  handleError(error: Error, remoteAddress?: string) {
    logger(this, error.message);
  }

  /**
   * Handles commands recieved by the bot.
   *
   * @param {Interaction} interaction Interaction in question.
   */
  async handleInteraction(interaction: Interaction) {
    if (!interaction.isCommand()) {
      return;
    }
    
    // Gets subcommand or command object.
    let command = reduceInteraction(interaction);

    if (!command) {
      return;
    }
    
    const {
      user,
    } = interaction;

    const guild: IGuild = await this.database.getGuild(interaction.guildId);

    const data = await command.execute(
      this.connections[guild.ip],
      this.database,
      guild,
      user,
      interaction.options,
    );

    // interaction.reply({
    //   content: ,
    //   ephemeral: true, // Means only shown to person who calls command
    // });
  }

  /**
   * Handles a new user joining a guild.
   */
  async handleGuildMemberAdded(member: GuildMember) {
    await this.database.createUser(
      member.user.id,
      member.user.username,
      member.guild.id,
    );
  }

  /**
   * Handles a user leaving a guild.
   *
   * @param {GuildMember | PartialGuildMember} member Member in question.
   */
  async handleGuildMemberRemove(member: GuildMember | PartialGuildMember) {
    await this.database.deleteAllUserBases(
      member.guild.id,
      member.user.id,
    );

    await this.database.deleteAllUserShops(
      member.guild.id,
      member.user.id,
    );

    await this.database.deleteAllUserActivity(
      member.guild.id,
      member.user.id,
    );
    
    await this.database.deleteUser(
      member.guild.id,
      member.user.id,
    );
  }

  /**
   * Handles a user reacting to a message.
   *
   * @param {MessageReaction | PartialMessageReaction} messageReaction Reaction in question.
   * @param {User | PartialUser} user User that reacted.
   */
  handleMessageReactionAdd(
    messageReaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser): void {
  }

  /**
   * Handles a new role being created.
   *
   * @param {Role} role The role in question
   */
  handleRoleCreate(role: Role) {
  }

  /**
   * Handles the bot connecting to server.
   */
   handleConnect(connection: WebSocketConnection) {
    this.connections[connection.remoteAddress] = connection;

    console.log(`Successfully connected to ${JSON.stringify(connection.remoteAddress)}`);

    connection.on('message', (message: WebSocketMessage) => this.handleMessage(message, connection.remoteAddress));
    connection.on('close', (code: number, reason: string) => this.handleClose(code, reason, connection.remoteAddress));
    connection.on('error', (error: Error) => this.handleError(error, connection.remoteAddress));
  }

  /**
   * Handles the bot failing to connect to server.
   *
   * @param {Error} error Error in question.
   */
  handleConnectFailed(error: Error) {
    logger(this, `Connection failed: ${error.message}`);
  }

  /**
   * Handles a new message sent from the server.
   *
   * @param {WebSocketMessage} message Message sent.
   * @param {string} remoteAddress Address of the server.
   */
  handleMessage(message: WebSocketMessage, remoteAddress: string) {
  }

  /**
   * Handles the lost of connection to a server.
   *
   * @param {number} code HTML code for the reason of the disconnect.
   * @param {string} reason Reason the server disconnected.
   * @param {string} remoteAddress IP of the server that disconnected.
   */
  handleClose(code: number, reason: string, remoteAddress: string) {
    logger(this, `Connection to  closed: ${code} ${reason}`);
  }
}
