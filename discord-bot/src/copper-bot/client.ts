// Packages
import {
  Client,
  ClientOptions,
  Interaction,
} from 'discord.js';
// Local Imports
import { READY_RESPONSE_STRING } from '../config';
import { CommandList } from '../copper-bot/commands';


// Our little buddy
export class CopperBot extends Client {
  /**
   * Instantiates the Copper Bot, calling discord.js' Client constructor.
   *
   * @param options Options for the client.
   */
  constructor(options: ClientOptions) {
    super(options);

    this.on('ready', this.handleConnect);
    this.on('interactionCreate', this.handleInteraction);
  }

  /**
   * Handles the bot connecting to discord.
   */
  handleConnect() {
    console.log(READY_RESPONSE_STRING);

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
}
