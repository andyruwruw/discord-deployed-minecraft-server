// Local Imports
import {
  IGuild,
  GuildQueries,
} from '../../types';

export let guilds: Array<IGuild> = [];

/**
 * Creates a new guild in the database.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<IGuild>} Guild object.
 */
const createGuild = async (guildId: string): Promise<IGuild> => {
  const guild: IGuild = {
    id: guildId,
    ip: 'unknown',
    port: 3000,
    generalChannelId: 'unknown',
    baseChannelId: 'unknown',
    shopsChannelId: 'unknown',
    eventsChannelId: 'unknown',
    commandListChannelId: 'unknown',
    commandsChannelId: 'unknown',
    logsChannelId: 'unknown',
    adminRoleId: 'unknown',
    onlineRoleId: 'unknown',
    offlineRoleId: 'unknown',
    playtimeLeaderRoleId: 'unknown',
    playtimeTier1RoleId: 'unknown',
    playtimeTier2RoleId: 'unknown',
    playtimeTier3RoleId: 'unknown',
    playtimeTier4RoleId: 'unknown',
    playtimeTier5RoleId: 'unknown',
    playtimeTier6RoleId: 'unknown',
    playtimeTier7RoleId: 'unknown',
    achievementsLeaderRoleId: 'unknown',
    achievementsMaxedRoleId: 'unknown',
    joined: new Date(),
  };

  guilds.push(guild);
  return guild;
};

/**
 * Retrieves a guild from the database.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<IGuild>} Guild object.
 */
const getGuild = async (guildId: string): Promise<IGuild> => {
  const matching: Array<IGuild> = guilds.filter((guild: IGuild) => guild.id === guildId);
  return matching[matching.length - 1];
};

/**
 * Retrieves a guild from the database by IP address.
 *
 * @param {string} ip Server IP address.
 * @returns {Promise<IGuild>} Guild object.
 */
const getGuildByIp = async (ip: string): Promise<IGuild> => {
  const matching: Array<IGuild> = guilds.filter((guild: IGuild) => guild.ip === ip);
  return matching[matching.length - 1];
};

/**
 * Retrieves all guilds from the database.
 *
 * @returns {Promise<Array<IGuild>>} Guild object.
 */
const getGuilds = async (): Promise<Array<IGuild>> => {
  return guilds;
};

/**
 * Updates a guild's server IP address.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} ip Server IP address.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildIp = async (
  guildId: string,
  ip: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].ip = ip;
  }
};

/**
 * Updates a guild's server port.
 *
 * @param {string} guildId Discord guild ID.
 * @param {number} port Server port.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildPort = async (
  guildId: string,
  port: number) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].port = port;
  }
};

/**
 * Updates a guild's general channel ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} channelId Discord channel ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildGeneralChannel = async (
  guildId: string,
  channelId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].generalChannelId = channelId;
  }
};

/**
 * Updates a guild's base channel ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} channelId Discord channel ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildBaseChannel = async (
  guildId: string,
  channelId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].baseChannelId = channelId;
  }
};

/**
 * Updates a guild's shops channel ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} channelId Discord channel ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildShopsChannel = async (
  guildId: string,
  channelId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].shopsChannelId = channelId;
  }
};

/**
 * Updates a guild's events channel ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} channelId Discord channel ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildEventsChannel = async (
  guildId: string,
  channelId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].eventsChannelId = channelId;
  }
};

/**
 * Updates a guild's command list channel ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} channelId Discord channel ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildCommandListChannel = async (
  guildId: string,
  channelId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].commandListChannelId = channelId;
  }
};

/**
 * Updates a guild's commands channel ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} channelId Discord channel ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildCommandsChannel = async (
  guildId: string,
  channelId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].commandsChannelId = channelId;
  }
};

/**
 * Updates a guild's logs channel ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} channelId Discord channel ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildLogsChannel = async (
  guildId: string,
  channelId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].logsChannelId = channelId;
  }
};

/**
 * Updates a guild's admin role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildAdminRole = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].adminRoleId = roleId;
  }
};

/**
 * Updates a guild's online role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildOnlineRole = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].onlineRoleId = roleId;
  }
};

/**
 * Updates a guild's offline role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildOfflineRole = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].offlineRoleId = roleId;
  }
};

/**
 * Updates a guild's playtime leader role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildPlaytimeLeaderRole = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].playtimeLeaderRoleId = roleId;
  }
};

/**
 * Updates a guild's playtime tier 1 role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildPlaytimeTier1Role = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].playtimeTier1RoleId = roleId;
  }
};

/**
 * Updates a guild's playtime tier 2 role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildPlaytimeTier2Role = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].playtimeTier2RoleId = roleId;
  }
};

/**
 * Updates a guild's playtime tier 3 role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildPlaytimeTier3Role = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].playtimeTier3RoleId = roleId;
  }
};

/**
 * Updates a guild's playtime tier 4 role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildPlaytimeTier4Role = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].playtimeTier4RoleId = roleId;
  }
};

/**
 * Updates a guild's playtime tier 5 role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildPlaytimeTier5Role = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].playtimeTier5RoleId = roleId;
  }
};

/**
 * Updates a guild's playtime tier 6 role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildPlaytimeTier6Role = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].playtimeTier6RoleId = roleId;
  }
};

/**
 * Updates a guild's playtime tier 7 role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildPlaytimeTier7Role = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].playtimeTier7RoleId = roleId;
  }
};

/**
 * Updates a guild's achievements leader role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildAchievementsLeaderRole = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].achievementsLeaderRoleId = roleId;
  }
};

/**
 * Updates a guild's achievements maxed role ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} roleId Discord role ID.
 * @returns {Promise<Query>} Response to query.
 */
const updateGuildAchievementsMaxedRole = async (
  guildId: string,
  roleId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds[index].achievementsMaxedRoleId = roleId;
  }
};

/**
 * Deletes a guild from the database.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Query>} Response to query.
 */
const deleteGuild = async (guildId: string) => {
  const index = guilds.findIndex((guild: IGuild) => guild.id === guildId);

  if (index !== -1) {
    guilds.splice(index, 1);
  }
};

export default {
  createGuild,
  getGuild,
  getGuildByIp,
  getGuilds,
  updateGuildIp,
  updateGuildPort,
  updateGuildGeneralChannel,
  updateGuildBaseChannel,
  updateGuildShopsChannel,
  updateGuildEventsChannel,
  updateGuildCommandListChannel,
  updateGuildCommandsChannel,
  updateGuildLogsChannel,
  updateGuildAdminRole,
  updateGuildOnlineRole,
  updateGuildOfflineRole,
  updateGuildPlaytimeLeaderRole,
  updateGuildPlaytimeTier1Role,
  updateGuildPlaytimeTier2Role,
  updateGuildPlaytimeTier3Role,
  updateGuildPlaytimeTier4Role,
  updateGuildPlaytimeTier5Role,
  updateGuildPlaytimeTier6Role,
  updateGuildPlaytimeTier7Role,
  updateGuildAchievementsLeaderRole,
  updateGuildAchievementsMaxedRole,
  deleteGuild,
} as GuildQueries;
