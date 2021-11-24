// Packages
import {
  Client,
  ClientOptions,
  Interaction,
} from 'discord.js';

// Local Imports
import { READY_RESPONSE_STRING } from '../config';
import { CommandList, Command } from '../copper-bot/commands';

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

    // Trying to setup SLASH commands
    // To get guildId right click server icon or name and at bottom copy id
    const guildId = "911933603691233300";
    const guild = this.guilds.cache.get(guildId);

    let commandRegister;

    // Can't use optional chaining sadge
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
   * @param {Inteaction} interaction Interaction in question.
   */
  async handleInteraction(interaction: Interaction) {
    if (!interaction.isCommand()) {
      return;
    }

    const {commandName, options} = interaction;

    // Handling here is temporary, will make responses contained in command itself

    if (commandName === 'ping') {
      interaction.reply({
        content: 'pong'.repeat(options.getNumber('pongs')!),
        ephemeral: true, // If true, only user who sent request sees response
      });
    } else if (commandName === "pog") {
      interaction.reply({
        content: 'Champ',
        ephemeral: true,
      });
    }
  }
}
