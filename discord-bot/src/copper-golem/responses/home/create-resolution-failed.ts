// Packages
import {
  CacheType,
  CommandInteractionOptionResolver,
} from 'discord.js';
import { DEFAULT_DIMENSION } from 'src/config';
import { IBase } from 'src/database/types';

// Local Imports
import { DiscordResponse } from '..';
import { Embed } from '../components';

const EMBED_TITLE = 'Failed to Create New Home';

/**
* Generates a response to a command.
*
* @returns {DiscordResponse} Response class instance.
*/
export const generateResponse = async (
  data: any,
  options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>,
): Promise<DiscordResponse> => {
  const embed = new Embed(
      EMBED_TITLE,
      [],
      `Something horribly catastrophic as occured!`,
  );

  return new DiscordResponse(
      '',
      [ embed ],
  );
}