// Local Imports
import { IGuild } from '../../types';
import { GuildModel } from '../models';

/**
 * Creates a new guild in the database.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<IGuild>} Guild object.
 */
const createGuild = async (guildId: string): Promise<IGuild> => {
  const newGuild = new GuildModel({ id: guildId });

  await newGuild.save();
  return newGuild.toObject() as IGuild;
};

/**
 * Retrieves a guild from the database.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<IGuild>} Guild object.
 */
const getGuild = async (guildId: string): Promise<IGuild> => {
  return GuildModel.findOne({ id: guildId });
};

/**
 * Retrieves all guilds from the database.
 *
 * @returns {Promise<Array<IGuild>>} Guild object.
 */
const getGuilds = async (): Promise<Array<IGuild>> => {
  return GuildModel.find();
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
  const query = { id: guildId };

  const update = {
    $set: {
      ip,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      port,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      generalChannelId: channelId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      baseChannelId: channelId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      shopsChannelId: channelId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      eventsChannelId: channelId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      commandListChannelId: channelId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      commandsChannelId: channelId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      logsChannelId: channelId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      adminRoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      onlineRoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      offlineRoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      playtimeLeaderRoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      playtimeTier1RoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      playtimeTier2RoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      playtimeTier3RoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      playtimeTier4RoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      playtimeTier5RoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      playtimeTier6RoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      playtimeTier7RoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      achievementsLeaderRoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
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
  const query = { id: guildId };

  const update = {
    $set: {
      achievementsMaxedRoleId: roleId,
    },
  };

  return GuildModel.updateOne(query, update);
};

/**
 * Deletes a guild from the database.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Query>} Response to query.
 */
const deleteGuild = async (guildId: string) => {
  return GuildModel.deleteOne({ id: guildId });
};

export default {
  createGuild,
  getGuild,
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
};
