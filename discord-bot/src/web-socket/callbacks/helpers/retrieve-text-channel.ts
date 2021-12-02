import {
  Channel,
  Client,
  DMChannel,
  NewsChannel,
  TextChannel,
  ThreadChannel,
} from "discord.js";

/**
 * Retrieves a Discord text channel for sending messages.
 * 
 * @param {string} channelId The ID of the channel to retrieve.
 * @returns 
 */
export const retrieveTextChannel = async (
  client: Client,
  channelId: string,
): Promise<(Channel & DMChannel) | (Channel & TextChannel) | (Channel & NewsChannel) | (Channel & ThreadChannel) | null> => {
  if (channelId === null || channelId === '' || channelId === 'unknown') {
    return null;
  }

  const channel = await client.channels.fetch(channelId);

  if (channel === null) {
    return channel;
  }

  channel?.isText();

  if (channel instanceof DMChannel 
    || channel instanceof TextChannel 
    || channel instanceof  NewsChannel 
    || channel instanceof ThreadChannel) {
    return channel;
  }
  return null;
};
