// Local Imports
import {
  Command,
  CommandList,
} from "..";

/**
 * Retrieves a command by name.
 *
 * @param {string} name Command name. 
 * @returns {Command | null} Command object or null if not found.
 */
export const getCommand = (name: string): Command | null => {
  const index = CommandList.findIndex(command => command.name === name);

  if (index === -1) {
    return null;
  }

  return CommandList[index];
};
