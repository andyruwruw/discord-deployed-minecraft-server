// Packages
import {
  ApplicationCommandOptionChoiceData,
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
} from 'discord.js';

// Local Imports
import { CommandOption } from './command-option';
import { UsedAbstractCommandError } from '../../../../errors/used-abstract-command-error';

export class StringParameter extends CommandOption {
  /**
   * Converts the command into ApplicationCommandOptionData for uploading to Discord.
   *
   * @returns {ApplicationCommandOptionData} Discord accepted object for command.
   */
  create(): ApplicationCommandOptionData {
    const body = {
      type: this.getType(),
      name: this.getKey(),
      description: this.getDescription(),
      required: this.isRequired(),
    } as ApplicationCommandOptionData;

    if (this.getChoices().length) {
      (body as Record<string, any>).choices = this.getChoices();
    }

    return body;
  }

  /**
   * Retrieves the Command's type.
   *
   * @returns {number} Type of the Command.
   */
  getType(): ApplicationCommandOptionType.String {
    return ApplicationCommandOptionType.String;
  }

  /**
   * Retrieves the Command's choices.
   *
   * @returns {number} Choices for command.
   */
  getChoices(): ApplicationCommandOptionChoiceData<string>[] {
    return [];
  }

  /**
   * Whether this parameter is required.
   *
   * @returns {boolean} Whether this parameter is required.
   */
  isRequired(): boolean {
    throw new UsedAbstractCommandError();
  }
}
