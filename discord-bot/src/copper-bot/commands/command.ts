// Packages
import { ApplicationCommandOptionData } from 'discord.js';
import { ApplicationCommandData } from 'discord.js';
import { ApplicationCommandTypes } from 'discord.js/typings/enums';

/**
 * Defines a command
 */
export class Command {

  // FIX: Need to figure out how to add the optional fields and how to use their correct datatypes
  // Tried with the ...() implementation and that seemed not to work well

  // PLANS: Need to add the response to either this class or seperate (responses)
  // Should be easy to handle either way

  commandStructure: ApplicationCommandData;
  
  name: string;
  description: string;
  type: ApplicationCommandTypes;
  options: any[] = [];


  constructor({
    name = '',
    description = '',
    type = ApplicationCommandTypes.CHAT_INPUT,
    options = [] as any,
  }) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.options = options;

    // Only chat commands can have descriptions
    if (this.type != ApplicationCommandTypes.CHAT_INPUT) {
      this.description = '';
    }

    this.commandStructure = {
      name: this.name,
      description: this.description,
      type: this.type,
      options: this.options,
    }

    console.log(this.commandStructure);
  }
}
