// Local Imports
import {
  IUser, 
  UserQueries,
} from '../../types';

export let users: Array<IUser> = [];

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
  const user: IUser = {
    id,
    username,
    guildId,
    minecraftUsername: '',
    totalHours: 0,
    achievements: [],
  };

  users.push(user);
  return user;
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
  const matching: Array<IUser> = users.filter((user: IUser) => user.guildId === guildId && user.id === userId);
  return matching[matching.length - 1];
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
  const matching: Array<IUser> = users.filter((user: IUser) => user.guildId === guildId && user.username === username);
  return matching[matching.length - 1];
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
  const matching: Array<IUser> = users.filter((user: IUser) => user.guildId === guildId && user.minecraftUsername === minecraftUsername);
  return matching[matching.length - 1];
};

/**
 * Retrieves all users for a given guild.
 *
 * @param {string} guildId Discord guild ID. 
 * @returns {Promise<Array<IUser>>} The users.
 */
const getGuildUsers = async (guildId: string): Promise<Array<IUser>> => {
  return users.filter((user: IUser) => user.guildId === guildId);
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
  const index = users.findIndex((user: IUser) => user.guildId === guildId && user.id === userId);

  if (index !== -1) {
    users[index].minecraftUsername = minecraftUsername;
  }
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
  const index = users.findIndex((user: IUser) => user.guildId === guildId && user.id === userId);

  if (index !== -1) {
    users[index].totalHours = totalHours;
  }
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
  const index = users.findIndex((user: IUser) => user.guildId === guildId && user.id === userId);

  if (index !== -1) {
    users[index].achievements.push(achievement);
  }
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
  const index = users.findIndex((user: IUser) => user.guildId === guildId && user.id === userId);

  if (index !== -1) {
    users.splice(index, 1);
  }
};

/**
 * Deletes all users from the database for a given guild.
 *
 * @param {string} guildId Discord guild ID. 
 * @returns {Promise<Query>} Response to query.
 */
const deleteGuildUsers = async (guildId: string) => {
  users = users.filter((user: IUser) => user.guildId !== guildId);
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
