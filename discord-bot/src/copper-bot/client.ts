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
import { client as WebSocketClient } from 'websocket';

// Local Imports
import { READY_RESPONSE_STRING } from '../config';
import { CommandList } from '../copper-bot/commands';
import { logger } from './logger';
import { generateWebSocketClient } from '../web-socket';

/**
 * Our little buddy.
 */
export class CopperBot extends Client {
  websocket: WebSocketClient;

  /**
   * Instantiates the Copper Bot, calling discord.js' Client constructor.
   *
   * @param {ClientOptions} options Options for the client.
   */
  constructor(options: ClientOptions) {
    super(options);
    
    // Discord Events
    this.on('ready', () => this.handleConnect());
    this.on('error', (error: Error) => this.handleError(error));
    this.on('interactionCreate', (interaction: Interaction) => this.handleInteraction(interaction));
    this.on('guildMemberAdd', (member: GuildMember) => this.handleGuildMemberAdded(member));
    this.on('guildMemberRemove', (member: GuildMember | PartialGuildMember) => this.handleGuildMemberRemove(member));
    this.on('messageReactionAdd', (messageReaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => this.handleMessageReactionAdd(messageReaction, user));
    this.on('roleCreate', (role: Role) => this.handleRoleCreate(role));

    this.websocket = generateWebSocketClient();

    // Server Events

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
  handleError(error: Error) {
    logger(this, error.message);
  }

  /**
   * Handles the bot connecting to server.
   */
  handleConnect() {
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
}
