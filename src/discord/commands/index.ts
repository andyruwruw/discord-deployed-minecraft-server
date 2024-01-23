/**
 * The CommandManager ensures commands are properly registered
 * and updated, as well as routing incoming interactions to 
 * the correct commands for handling.
 * 
 * It's the main facade to all commands. 
 */

// Packages
import {
  ApplicationCommand,
  ApplicationCommandOption,
  ApplicationCommandOptionData,
  ClientApplication,
  CommandInteraction,
  GuildResolvable,
  Interaction,
  Message,
} from 'discord.js';

// Local Imports
import {
  MESSAGE_COMMANDS_REGISTERED,
  MESSAGE_COMMANDS_REGISTER_START,
} from '../../config/messages';
import { Command } from './generic/command';
import { DiscordBot } from '../discord-bot';
import { Monitor } from '../../helpers/monitor';

/**
 * Manages all commands and routes interactions to correct command.
 */
export class CommandManager {
  /**
   * Static dictionary of commands to be registered.
   */
  static _commands: Record<string, Command> = {};

  /**
   * Fills command lists with commands.
   */
  static instantiateCommands() {
    // General Commands
    CommandManager._commands[HelpCommand.key] = new HelpCommand();
    CommandManager._commands[ForecastCommand.key] = new ForecastCommand();
    CommandManager._commands[ViewCommand.key] = new ViewCommand();
  }

  /**
   * Handle an incoming interaction.
   *
   * @param {Interaction} interaction Interaction to check.
   * @returns {Promise<void>} Promise of action.
   */
  static async handleInteraction(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) {
      return;
    }

    const key = interaction.commandName;

    if (key in CommandManager._commands) {
      await CommandManager._commands[key].execute(interaction as CommandInteraction);
      return;
    }
  }

  /**
   * Handle a message being sent.
   *
   * @param {Message} message The message to check.
   */
  static handleMessage(message: Message): void {
  }

  /**
   * Registers slash commands with Discord.
   * 
   * @param {DiscordBot} client The Discord.js client.
   */
  static async registerCommands(client: DiscordBot): Promise<void> {
    try {
      Monitor.log(
        CommandManager,
        MESSAGE_COMMANDS_REGISTER_START,
        Monitor.Layer.UPDATE,
      );

      // Retrieve registered application commands.
      const applicationCommands = await (client.application as ClientApplication).commands.fetch();

      const tracker = CommandManager._createCommandStatusTracker();
      const promises = [] as Promise<void>[];

      // Go through each registered command.
      for (let i = 0; i < applicationCommands.size; i += 1) {
        // If defined, process that command.
        if (applicationCommands.at(i) !== undefined) {
          const command = applicationCommands.at(i) as ApplicationCommand<{ guild: GuildResolvable }>;

          // Mark this command as checked and check it.
          if (command.name in tracker) {
            tracker[command.name] = true;
          }
          promises.push(CommandManager._processApplicationCommand(
            client,
            command,
          ));
        }
      }

      // Wait for all commands to be checked.
      await Promise.all(promises);

      // Clear our promises.
      promises.splice(0, promises.length);

      // Check all commands to see if any weren't addressed.
      const commandKeys = Object.keys(tracker);

      for (let i = 0; i < commandKeys.length; i += 1) {
        if (!tracker[commandKeys[i]]) {
          Monitor.log(
            CommandManager,
            `${commandKeys[i]} not found, creating`,
            Monitor.Layer.UPDATE,
          );

          // Create unchecked commands.
          promises.push(CommandManager._createCommandFromKey(
            client,
            commandKeys[i],
          ));
        }
      }

      // Wait for all outstanding commands to be created.
      await Promise.all(promises);

      Monitor.log(
        CommandManager,
        MESSAGE_COMMANDS_REGISTERED,
        Monitor.Layer.UPDATE,
      );
    } catch (error) {
      Monitor.log(
        CommandManager,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Processes an Application command checking it to existing records.
   *
   * @param {DiscordBot} client The Discord.js client.
   * @param {ApplicationCommand<{ guild: GuildResolvable }>} command The command in question.
   * @returns {Promise<void>} Promise of the action.
   */
  static async _processApplicationCommand(
    client: DiscordBot,
    command: ApplicationCommand<{ guild: GuildResolvable }>,
  ): Promise<void> {
    if (command.name in CommandManager._commands
      && CommandManager._applicationCommandMatches(
        command,
        CommandManager._commands[command.name],
      )) {
      return;
    }
    Monitor.log(
      CommandManager,
      'Creating a Command',
      Monitor.Layer.UPDATE,
    );

    await (client.application as ClientApplication).commands.delete(command.id);

    if (command.name in CommandManager._commands) {
      await CommandManager._createCommandFromKey(
        client,
        command.name,
      );
    }
  }

  /**
   * Creates a command off the key.
   *
   * @param {DiscordBot} client The Discord.js client.
   * @param {string} key Key of the command to create. 
   * @returns {Promise<void>} Promise of the action.
   */
  static async _createCommandFromKey(
    client: DiscordBot,
    key: string,
  ): Promise<void> {
    await (client.application as ClientApplication).commands.create(CommandManager._commands[key].create());

    return;
  }

  /**
   * Whether an application command and command are the same.
   *
   * @param {ApplicationCommand} applicationCommand Application command in question.
   * @param {Command} command Command in question.
   * @returns {boolean} Whether the commands are the same.
   */
  static _applicationCommandMatches(
    applicationCommand: ApplicationCommand,
    command: Command,
  ): boolean {
    if (command.isHidden()) {
      return false;
    }

    if (applicationCommand.name !== command.getKey()
      || applicationCommand.description !== command.getDescription()) {
      return false;
    }

    return CommandManager._compareOptions(
      applicationCommand.options,
      command.getOptions(),
    );
  }

  /**
   * Whether an application command options and command options are the same.
   *
   * @param {ApplicationCommandOption[]} applicationOptions Application command options in question.
   * @param {ApplicationCommandOptionData[]} options Options in question.
   * @returns {boolean} Whether the commands options are the same.
   */
  static _compareOptions(
    applicationOptions: ApplicationCommandOption[],
    options: ApplicationCommandOptionData[],
  ): boolean {
    if (applicationOptions.length !== options.length) {
      return false;
    }

    for (let i = 0; i < applicationOptions.length; i += 1) {
      const applicationOption = applicationOptions[i];

      for (let j = 0; j < options.length; j += 1) {
        if (applicationOption.name === options[i].name) {
          const commandOption = options[i];

          if (applicationOption.description !== commandOption.description
            || applicationOption.type !== commandOption.type) {
            return false;
          }
          if ('options' in applicationOption
            && applicationOption.options !== undefined
            && 'options' in commandOption
            && commandOption !== undefined) {
            if (!CommandManager._compareOptions(
              applicationOption.options as ApplicationCommandOption[],
              commandOption.options as ApplicationCommandOptionData[],
            )) {
              return false;
            }
          } else if ((('options' in applicationOption
            && applicationOption.options !== undefined)
            && (!('options' in commandOption)
            || commandOption.options === undefined))
            || (('options' in commandOption
            && commandOption.options !== undefined)
            && (!('options' in applicationOption)
            || applicationOption.options === undefined))) {
            return false;
          }
          break;
        }

        if (j === options.length - 1) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Returns a dictionary with the intention of tracking commands.
   *
   * @returns {Record<string, boolean>} Dictionary for tracking commands.
   */
  static _createCommandStatusTracker(): Record<string, boolean> {
    const tracker = {} as Record<string, boolean>;

    const commands = Object.keys(CommandManager._commands);

    for (let i = 0; i < commands.length; i += 1) {
      tracker[commands[i]] = false;
    }

    return tracker;
  }
}
