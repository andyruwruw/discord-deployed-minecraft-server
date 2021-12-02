// Local Imports
import {
  IUserActivity,
  UserActivityQueries,
} from '../../types';
import { UserActivityModel } from '../models';

/**
 * Creates a new user activity log.
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
  const userActivity = new UserActivityModel({
    guildId,
    userId,
    start,
  });

  await userActivity.save();
  return userActivity.toObject() as IUserActivity;
};

/**
 * Retrieves all user activity for a given guild.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Array<IUserActivity>>} The user activity.
 */
const getGuildUserActivity = async (guildId: string): Promise<Array<IUserActivity>> => {
  return UserActivityModel.find({ guildId });
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
  return UserActivityModel.find({ guildId, userId });
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
  return UserActivityModel.deleteMany({
    guildId,
    userId,
  });
};

/**
 * Deletes all user activity from the database for a given guild.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Query>} Response to query.
 */
const deleteAllGuildUserActivity = async (guildId: string) => {
  return UserActivityModel.deleteMany({ guildId });
};

export default {
  createUserActivity,
  getGuildUserActivity,
  getUserActivity,
  deleteAllUserActivity,
  deleteAllGuildUserActivity,
} as UserActivityQueries;
