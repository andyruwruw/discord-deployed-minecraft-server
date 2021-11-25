// Packages
import { typeAlias } from '@babel/types';
import { ApplicationCommand, ApplicationCommandOptionData, ApplicationCommandType, BaseMessageComponentOptions, CacheType, ChatInputApplicationCommandData, CommandInteractionOptionResolver, FileOptions, InteractionReplyOptions, Message, MessageEmbed, MessageMentionOptions } from 'discord.js';
import { Interaction } from 'discord.js';
import { ApplicationCommandData } from 'discord.js';
import { ApplicationCommandTypes } from 'discord.js/typings/enums';

/**
 * Defines a command
 */
// interface CopperCommandData {
//   name: string,
//   description: string,
//   type?: ApplicationCommandType,
//   options?: ApplicationCommandOptionData[],
//   defaultPermission?: boolean
// }
export class Command {

  // FIX: Need to figure out how to add the optional fields and how to use their correct datatypes
  // Tried with the ...() implementation and that seemed not to work well

  // PLANS: Need to add the response to either this class or seperate (responses)
  // Should be easy to handle either way
  commandStructure: ApplicationCommandData;
  responseStructure: InteractionReplyOptions;

  constructor() {
    this.commandStructure = {} as ApplicationCommandData;
    this.responseStructure = {} as InteractionReplyOptions;
  }

  /**
   * Sets up the command
   * 
   * @param {string} name Name of command that is used to call it
   * @param {string} description Description of what the command does
   * @param {ApplicationCommandType} [type] Either CHAT_INPUT (in chat), USER (in context menu of bot), MESSAGE (in context menu of message)
   * @param {ApplicationCommandOptionData[]} [options] Options for the command that automatically parse and validate user input
   */
  setCommand(
    name: string,
    description: string,
    type?: ApplicationCommandTypes,
    options?: ApplicationCommandOptionData[],
  ): void {
    this.commandStructure = {
      name: name,
      description: description,
      type: type,
      options: options,
    }
  }

  getCommand(): ApplicationCommandData {
    return this.commandStructure;
  }

  generateResponse(
    options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ) {}
}
