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
import { Database } from '../database/database';
import { getDatabase } from '../database';
import { CommandList } from '../copper-bot/commands';
import { logger } from './logger';
import {
  DATABASE_CONNECTION_SUCCESS,
  READY_RESPONSE_STRING,
} from '../config';

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
    }
  }

  /**
   * Connects bot to guild servers.
   */
  async connectToServers() {
    const guilds = await this.database.getGuilds();

    for (let guild of guilds) {
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
  handleReady() {
    // To get guildId right click server icon or name and at bottom copy id
    const guildId = '911933603691233300';
    const guild = this.guilds.cache.get(guildId);

    /**
     * This is used to register slash commands for the bot to use them
     * There are two types of commands, Guild and Application
     * Guild commands are only usable on the server (guild) specified by {guildId}
     * Application commands are accessable on all servers the bot is on, but take about an hour to deploy fully
     */
    let commandRegister; 

    if (guild) {
      commandRegister = guild.commands;
    } else if (this.application) {
      commandRegister = this.application.commands;
    }

    if (commandRegister) {
      for (let command of CommandList) {
        commandRegister.create(command.commandStructure);
      }
    }

    logger(this, READY_RESPONSE_STRING);
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

    // commandName is the name specified in the 'name' field of a command
    // user is the User object of whoever called the command
    // options are the parameters that are prompted / required when calling the command
    const { commandName, user, options } = interaction;

    for (let command of CommandList) {
      if (command.commandStructure.name === commandName) {
        interaction.reply({
          content: command.generateResponse(user, options),
          ephemeral: true, // Means only shown to person who calls command
        });
      }
    }
  }

  /**
   * Handles a new user joining a guild.
   */
  handleGuildMemberAdded(member: GuildMember) {

  }

  handleGuildMemberRemove(member: GuildMember | PartialGuildMember) {
  }

  handleMessageReactionAdd(
    messageReaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser): void {
  }

  handleRoleCreate(role: Role) {
  }

  handleMessage(remoteAddress: string, message: WebSocketMessage) {
  }

  handleClose(remoteAddress: string, code: number, reason: string) {
    logger(this, `Connection to  closed: ${code} ${reason}`);
  }

  /**
   * Handles the bot connecting to server.
   */
  handleConnect(connection: WebSocketConnection) {
    this.connections[connection.remoteAddress] = connection;

    console.log(`Successfully connected to ${JSON.stringify(connection.remoteAddress)}`);

    connection.on('message', (message: WebSocketMessage) => this.handleMessage(connection.remoteAddress, message));
    connection.on('close', (code: number, reason: string) => this.handleClose(connection.remoteAddress, code, reason));
    connection.on('error', (error: Error) => this.handleError(error, connection.remoteAddress));
  }

  /**
   * 
   * @param {Error} error Error in question.
   */
  handleConnectFailed(error: Error) {
    logger(this, `Connection failed: ${error.message}`);
  }
}
