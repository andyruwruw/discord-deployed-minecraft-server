import { Client } from 'discord.js';

export const logger = (
  client: Client,
  message: string,
  remoteAddress?: string): void => {
  console.log(message);
};
