import { Client } from 'discord.js';

export const logger = (
  client: Client,
  message: string): void => {
  console.log(message);
};
