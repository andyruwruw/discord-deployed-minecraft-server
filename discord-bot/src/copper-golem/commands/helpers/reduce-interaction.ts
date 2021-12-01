// Packages
import {
  CacheType,
  CommandInteraction,
  Interaction,
} from 'discord.js';

// Local Imports
import { Command } from '../index';
import { getCommand } from './get-command';

/**
 * Reduces an interaction to its command or subcommand.
 *
 * @param {Interaction} interaction Discord interaction.
 * @returns {Command | null} Command or null.
 */
export const reduceInteraction = (interaction: Interaction): Command | null => {
  const {
    commandName,
    options,
  } = interaction as CommandInteraction<CacheType>;

  let command: Command | null = getCommand(commandName);

  if (!command) {
    return null;
  }

  if (options.getSubcommand() !== null) {
    command = (command as Command).getSubCommand(options.getSubcommand());
  }

  return command;
};
