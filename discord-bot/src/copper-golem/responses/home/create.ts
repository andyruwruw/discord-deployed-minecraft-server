// Packages
import {
    CacheType,
    CommandInteractionOptionResolver,
} from 'discord.js';

// Local Imports
import { DiscordResponse } from '..';
import { Embed } from '../components';

const EMBED_TITLE = 'Creating New Home';

const EMBED_DESCRIPTION = 'Retrieving location from Minecraft Server...';

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
        EMBED_DESCRIPTION,
    );

    return new DiscordResponse(
        '',
        [ embed ],
    );
}
