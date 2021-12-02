// Packages
import {
  ApplicationCommandData,
  ApplicationCommandOptionData,
  CacheType,
  CommandInteractionOptionResolver,
  User,
} from 'discord.js';
import { Database } from '../../database/database';
import { connection as WebSocketConnection } from 'websocket';
import { DiscordResponse } from '../responses';
import { IGuild } from 'src/database/types';

/**
 * The base class for all Discord commands.
 */
export class Command {
  /**
   * Name of the slash command.
   */
  name: string;

  /**
   * Description of the command.
   */
  description: string;

  /**
   * Callback to run when command is called.
   */
  callback: Function;

  /**
   * Function that generates a response to the user.
   */
  response: Function;

  /**
   * Type of the command, either a chat command (/{name}), user command (bot context menu), message command (message context menu).
   */
  type?: number;

  /**
   * Fields to take in and parse user input.
   */
  options: ApplicationCommandOptionData[];

  /**
   * Subcommands of the command.
   */
  subCommands: Command[];

  /**
   * Whether the command requires admin role.
   */
  restricted: boolean;

  /**
   * Whether this command is simply a resolution to another.
   */
  resolution: boolean;

  /**
   * Instantiates a command.
   *
   * @param {string} name Name of the slash command.
   * @param {string} description Description of the command.
   * @param {Function} callback Callback to run when command is called.
   * @param {Function} response Function that generates a response to the user.
   * @param {number} type Type of the command.
   * @param {ApplicationCommandOptionData[]} options Fields to take in and parse user input.
   * @param {Command[]} subCommands Subcommands of the command.
   * @param {boolean} restricted Whether the command requires admin role.
   */
  constructor(
    name: string,
    description: string,
    callback: Function,
    response: Function,
    restricted: boolean = false,
    type?: number,
    options?: Array<ApplicationCommandOptionData>,
    subCommands?: Command[],
    resolution?: boolean,
  ) {
    this.name = name;
    this.description = description;
    this.callback = callback;
    this.response = response;
    this.type = type;
    this.options = options || [];
    this.subCommands = subCommands || [];
    this.restricted = restricted;
    this.resolution = resolution || false;
  }

  /**
   * Converts the command into ApplicationCommandData for uploading to Discord.
   * 
   * @returns {ApplicationCommandData} Discord accepted object for command.
   */
  create(): ApplicationCommandData {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      defaultPermission: !this.restricted,
      options: [
        ...this.options,
        ...this.subCommands.map(command => command.create()) as Array<ApplicationCommandOptionData>,
      ],
    };
  }

  /**
   * Executes command callback.
   *
   * @param {WebSocketConnection} connection Connection to user's server.
   * @param {IGuild} guild Database guild object.
   * @param {User} user User that executed the command.
   * @param {Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>} options Options from the interaction
   * @returns {Promise<any>} Promise of callback function.
   */
  async execute(
    connection: WebSocketConnection,
    guild: IGuild,
    user: User,
    options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
    isDm: boolean,
    channelId: string | null,
  ): Promise<DiscordResponse> {
    return this.callback(
      connection,
      guild,
      user,
      options,
      isDm,
      channelId
    );
  }

  /**
   * Finds a subcommand by name.
   *
   * @param {string} name Name of the subcommand.
   * @returns {Command | null} Subcommand if found, null otherwise.
   */
  getSubCommand(name: string): Command | null {
    if (this.subCommands.length === 0) {
      return null;
    }

    const index = this.subCommands.findIndex(command => command.name === name);

    if (index !== -1) {
      return this.subCommands[index];
    }
    return null;
  };
}
