// Local Imports
import user from 'src/database/mongodb/queries/user';
import {
  IUserActivity,
  UserActivityQueries,
} from '../../types';

export let userActivities: Array<IUserActivity> = [];

/**
 * 
 * @param {string} guildId Discord guild ID.
 * @param {string} userId User's Discord ID.
 * @param {Date} start Date the user logged in.
 * @returns {Promise<IUserActivity>} The user activity.
 */
const createUserActivity = async (
  guildId: string,
  userId: string,
  start: Date,
): Promise<IUserActivity> => {
  const userActivity: IUserActivity = {
    guildId,
    userId,
    start,
    end: new Date(),
  };

  userActivities.push(userActivity);
  return userActivity;
};

/**
 * Retrieves all user activity for a given guild.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Array<IUserActivity>>} The user activity.
 */
const getGuildUserActivity = async (guildId: string): Promise<Array<IUserActivity>> => {
  return userActivities.filter((userActivity: IUserActivity) => userActivity.guildId === guildId);
};

/**
 * Retrieves all user activity for a given user.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId User's Discord ID.
 * @returns {Promise<Array<IUserActivity>>} The user activity.
 */
const getUserActivity = async (
  guildId: string,
  userId: string): Promise<Array<IUserActivity>> => {
  return userActivities.filter((userActivity: IUserActivity) => userActivity.guildId === guildId && userActivity.userId === userId);
};

/**
 * Deletes all user activity from the database for a given user.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId User's Discord ID.
 * @returns {Promise<Query>} Response to query.
 */
 const deleteAllUserActivity = async (
  guildId: string,
  userId: string) => {
  userActivities = userActivities.filter((userActivity: IUserActivity) => userActivity.guildId !== guildId || userActivity.userId !== userId);
};

/**
 * Deletes all user activity from the database for a given guild.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Query>} Response to query.
 */
const deleteAllGuildUserActivity = async (guildId: string) => {
  userActivities = userActivities.filter((userActivity: IUserActivity) => userActivity.guildId !== guildId);
};

export default {
  createUserActivity,
  getGuildUserActivity,
  getUserActivity,
  deleteAllUserActivity,
  deleteAllGuildUserActivity,
} as UserActivityQueries;
