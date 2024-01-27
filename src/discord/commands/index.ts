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
  Guild,
  GuildResolvable,
  Interaction,
  Message,
  OAuth2Guild,
} from 'discord.js';

// Local Imports
import {
  MESSAGE_COMMANDS_REGISTERED,
  MESSAGE_COMMANDS_REGISTER_START,
} from '../../config/messages';
import { Command } from './generic/command';
import { DiscordBot } from '../';
import { Monitor } from '../../helpers/monitor';
import { AssignCommand } from './assign/assign-command';

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
    CommandManager._commands[AssignCommand.key] = new AssignCommand();
  }

  /**
   * Handle an incoming interaction.
   *
   * @param {Interaction} interaction Interaction to check.
   * @returns {Promise<void>} Promise of action.
   */
  static async handleInteraction(interaction: Interaction): Promise<void> {
    console.log('hello');
    if (!interaction.isCommand()) {
      console.log('not command');
      return;
    }

    const key = interaction.commandName;

    console.log(key);

    if (key in CommandManager._commands) {
      console.log('running');
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

      // await CommandManager._processApplicationCommands(client);

      const guilds = await Promise.all((await client.guilds.fetch()).map(async (guild: OAuth2Guild) => {
        return guild.fetch();
      }));

      const promises = [];

      for (let i = 0; i < guilds.length; i += 1) {
        promises.push(CommandManager._processGuildCommands(guilds[i]));
      }

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
   * Processes all application commands.
   * 
   * @param {DiscordBot} client Discord bot client.
   */
  static async _processApplicationCommands(client: DiscordBot): Promise<void> {
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
        promises.push(CommandManager._processCommand(
          command,
          client,
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
          `Command: "${commandKeys[i]}" not found. Creating now.`,
          Monitor.Layer.UPDATE,
        );

        // Create unchecked commands.
        promises.push(CommandManager._createCommandFromKey(
          commandKeys[i],
          client,
        ));
      }
    }

    // Wait for all outstanding commands to be created.
    await Promise.all(promises);
  }

  /**
   * Processes all guild commands.
   * 
   * @param {Guild} guild Guild to process.
   */
  static async _processGuildCommands(guild: Guild): Promise<void> {
    const commands = await guild.commands.fetch();

    const tracker = CommandManager._createCommandStatusTracker();
    const promises = [] as Promise<void>[];

    for (let j = 0; j < commands.size; j += 1) {
      // If defined, process that command.
      if (commands.at(j) !== undefined) {
        const command = commands.at(j) as ApplicationCommand<{ guild: GuildResolvable }>;

        // Mark this command as checked and check it.
        if (command.name in tracker) {
          tracker[command.name] = true;
        }
        promises.push(CommandManager._processCommand(
          command,
          null,
          guild
        ));
      }
    }

    // Check all commands to see if any weren't addressed.
    const commandKeys = Object.keys(tracker);

    for (let i = 0; i < commandKeys.length; i += 1) {
      if (!tracker[commandKeys[i]]) {
        Monitor.log(
          CommandManager,
          `Command: "${commandKeys[i]}" not found. Creating now.`,
          Monitor.Layer.UPDATE,
        );

        // Create unchecked commands.
        promises.push(CommandManager._createCommandFromKey(
          commandKeys[i],
          null,
          guild,
        ));
      }
    }

    // Wait for all outstanding commands to be created.
    await Promise.all(promises);
  }

  /**
   * Processes a command checking it to existing records.
   *
   * @param {ApplicationCommand<{ guild: GuildResolvable }>} command The command in question.
   * @param {DiscordBot | null} [client = null] The Discord.js client.
   * @param {Guild | null} [guild = null] The Discord guild.
   * @returns {Promise<void>} Promise of the action.
   */
  static async _processCommand(
    command: ApplicationCommand<{ guild: GuildResolvable }>,
    client = null as DiscordBot | null,
    guild = null as Guild | null,
  ): Promise<void> {
    if (command.name in CommandManager._commands
      && CommandManager._commandMatches(
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

    if (client !== null) {
      await (client.application as ClientApplication).commands.delete(command.id);
    } else {
      await (guild as Guild).commands.delete(command.id);
    }

    if (command.name in CommandManager._commands) {
      await CommandManager._createCommandFromKey(
        command.name,
        client,
        guild,
      );
    }
  }

  /**
   * Creates a command off the key.
   *
   * @param {string} key Key of the command to create. 
   * @param {DiscordBot | null} [client = null] The Discord.js client.
   * @param {Guild | null} [guild = null] The Discord guild.
   * @returns {Promise<void>} Promise of the action.
   */
  static async _createCommandFromKey(
    key: string,
    client = null as DiscordBot | null,
    guild = null as Guild | null,
  ): Promise<void> {
    const data = CommandManager._commands[key].create();

    if (client !== null) {
      await (client.application as ClientApplication).commands.create(data);
    } else {
      await (guild as Guild).commands.create(data);
    }

    return;
  }

  /**
   * Whether an application command and command are the same.
   *
   * @param {ApplicationCommand} applicationCommand Application command in question.
   * @param {Command} command Command in question.
   * @returns {boolean} Whether the commands are the same.
   */
  static _commandMatches(
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
