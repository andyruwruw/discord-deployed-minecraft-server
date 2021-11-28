// Local Imports
import {
  IUser, 
  UserQueries,
} from '../../types';
import { UserModel } from '../models';

/**
 * Creates a new user.
 *
 * @param {string} id The user's Discord ID.
 * @param {string} username The user's Discord username.
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<IUser>} The created user.
 */
const createUser = async (
  id: string,
  username: string,
  guildId: string,
): Promise<IUser> => {
  const user = new UserModel({
    id,
    username,
    guildId,
  });

  await user.save();
  return user.toObject() as IUser;
};

/**
 * Retrieves a user by Discord ID.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId The user's Discord ID.
 * @returns {Promise<IUser>} The user.
 */
const getUser = async (
  guildId: string,
  userId: string): Promise<IUser> => {
  return UserModel.findOne({
    guildId,
    id: userId,
  });
};

/**
 * Retrieves a user by Discord username.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} username The user's Discord username.
 * @returns {Promise<IUser>} The user.
 */
const getUserByDiscordUsername = async (
  guildId: string,
  username: string): Promise<IUser> => {
  return UserModel.findOne({
    guildId,
    username,
  });
};

/**
 * Retrieves a user by Minecraft username.
 *
 * @param {string} guildId Discord guild ID. 
 * @param {string} minecraftUsername The user's Minecraft username. 
 * @returns {Promise<IUser>} The user.
 */
const getUserByMinecraftUsername = async (
  guildId: string,
  minecraftUsername: string): Promise<IUser> => {
  return UserModel.findOne({
    guildId,
    minecraftUsername,
  });
};

/**
 * Retrieves all users for a given guild.
 *
 * @param {string} guildId Discord guild ID. 
 * @returns {Promise<Array<IUser>>} The users.
 */
const getGuildUsers = async (guildId: string): Promise<Array<IUser>> => {
  return UserModel.find({ guildId });
};

/**
 * Updates a user's Minecraft username.
 *
 * @param {string} guildId Discord guild ID. 
 * @param {string} userId The user's Discord ID.
 * @param {string} minecraftUsername The user's Minecraft username. 
 * @returns {Promise<Query>} Response to query.
 */
const updateUserMinecraftUsername = async (
  guildId: string,
  userId: string,
  minecraftUsername: string) => {
  const query = {
    id: userId,
    guildId,
  };

  const update = {
    $set: {
      minecraftUsername,
    },
  };

  return UserModel.updateOne(query, update);
};

/**
 * Updates a user's total hours.
 *
 * @param {string} guildId Discord guild ID. 
 * @param {string} userId The user's Discord ID.
 * @param {number} totalHours The user's total hours.
 * @returns {Promise<Query>} Response to query.
 */
const updateUserTotalHours = async (
  guildId: string,
  userId: string,
  totalHours: number) => {
  const query = {
    id: userId,
    guildId,
  };

  const update = {
    $set: {
      totalHours,
    },
  };

  return UserModel.updateOne(query, update);
};

/**
 * Updates a user's achievements
 *
 * @param {string} guildId Discord guild ID. 
 * @param {string} userId The user's Discord ID.
 * @param {string} achievement User's new achievement.
 * @returns {Promise<Query>} Response to query.
 */
const addUserAchievement = async (
  guildId: string,
  userId: string,
  achievement: string) => {
  const query = {
    id: userId,
    guildId,
  };

  const update = {
    $push: {
      achievements: achievement,
    },
  };

  return UserModel.updateOne(query, update);
};

/**
 * Deletes a user from the database by Discord ID.
 *
 * @param {string} guildId Discord guild ID. 
 * @param {string} userId The user's Discord ID.
 * @returns {Promise<Query>} Response to query.
 */
const deleteUser = async (
  guildId: string,
  userId: string) => {
  return UserModel.deleteOne({
    guildId,
    id: userId,
  });
};

/**
 * Deletes all users from the database for a given guild.
 *
 * @param {string} guildId Discord guild ID. 
 * @returns {Promise<Query>} Response to query.
 */
const deleteGuildUsers = async (guildId: string) => {
  return UserModel.deleteOne({ guildId });
};

export default {
  createUser,
  getUser,
  getUserByDiscordUsername,
  getUserByMinecraftUsername,
  getGuildUsers,
  updateUserMinecraftUsername,
  updateUserTotalHours,
  addUserAchievement,
  deleteUser,
  deleteGuildUsers,
} as UserQueries;
