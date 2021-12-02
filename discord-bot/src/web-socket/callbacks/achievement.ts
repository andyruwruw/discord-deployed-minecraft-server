// Packages
import { Channel, Client, GuildMember } from 'discord.js';
import { connection as WebSocketConnection } from 'websocket';

// Local Imports
import {
  WebSocketAchievementMessage,
  WebSocketMessageData,
} from '../types';
import { WebSocketCallback } from './callback';
import { Database } from '../../database/database';
import { IGuild, IUser } from 'src/database/types';

/**
 * Database Instance
 */
 const database = new Database();

/**
 * Name of the websocket response.
 */
export const NAME = 'achievement';

/**
 * Callback run on response.
 *
 * @param {Message} message The message that was sent.
 * @param {Client} client The Discord bot client.
 * @param {WebSocketConnection} connection Connection to guild's server.
 */
const callback = async (
  message: WebSocketMessageData,
  client: Client,
  connection: WebSocketConnection,
  guild: IGuild,
): Promise<any> => {
  const {
    player,
    achievement,
  } = message as WebSocketAchievementMessage;
  
  let channel: Channel | null = null;
  if (guild.achievementsChannelId !== 'unknown') {
    channel = await client.channels.fetch(guild.achievementsChannelId);
  }

  await database.addUserAchievement(
    guild.id,
    player,
    achievement,
  );

  const databaseUsers: Array<IUser> = await database.getGuildUsers(guild.id);
  const discordGuild = await client.guilds.cache.get(guild.id);

  const databaseUser: IUser | undefined = databaseUsers.find(user => user.minecraftUsername === player);

  if (databaseUser === undefined) {
    return;
  }

  const discordUser = await discordGuild?.members.cache.get(databaseUser.id);

  if (channel && channel.isText()) {
    await channel.send(`${discordUser?.displayName} has earned the achievement **${achievement}**!`);
  }

  let currentTop: GuildMember | null = null;
  let top: IUser | null = null;

  for (const user of databaseUsers) {
    const discordUser = discordGuild?.members.cache.get((user as IUser).id);

    if (top === null || user.achievements.length > top.achievements.length) {
      top = user;
    }

    if (discordUser?.roles.cache.has(guild.achievementsLeaderRoleId)) {
      currentTop = discordUser;
    }
  }

  if (currentTop !== null) {
    currentTop?.roles.remove(guild.achievementsLeaderRoleId);
  }

  if (top !== null) {
    const discordTop = discordGuild?.members.cache.get((top as IUser).id);

    if (!discordTop) {
      return;
    }

    discordTop.roles.add(guild.achievementsLeaderRoleId);

    if (channel && channel.isText()) {
      if (currentTop === null) {
        await channel.send(`${discordTop.displayName} is the new leader of achievements!`);
      } else {
        await channel.send(`${discordTop.displayName} has overtaken ${currentTop.displayName}!`);
      }
    }
  }
};

export const AchievementResponse = new WebSocketCallback(
  NAME,
  callback,
);