// Packages
import {
  Client,
  ClientOptions,
  Message,
  Interaction,
} from 'discord.js';

// Local Imports
import { READY_RESPONSE_STRING } from '../config';
// import { getCommand, isMention } from '../helpers';
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
    // this.on('message', this.handleMessage);
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

  // /**
  //  * Handles messages recieved by the bot.
  //  *
  //  * @param {Message} message Message in question.
  //  */
  // handleMessage(message: Message) {
  //   if (isMention(message, this)) {
  //     const command = getCommand(message);

  //     if (command) {
  //       command.execute(message);
  //     }
  //   }
  // }

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
        content: 'pong',
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
