// Local Imports
import { IBase } from '../../types';
import { BaseModel } from '../models';

/**
 * Creates a new base.
 *
 * @param {string} guildId Discord guild ID.
 * @param {Array<string>} userIds Owners of the base's Discord IDs.
 * @param {number} x X coordinates of the base.
 * @param {number} y y coordinates of the base.
 * @param {number} z z coordinates of the base.
 * @returns {Promise<IBase>} The created base.
 */
const createBase = async (
  guildId: string,
  userIds: Array<string>,
  x: number,
  y: number,
  z: number,
  name: string = 'Home'): Promise<IBase> => {
  const base = new BaseModel({
    guildId,
    userIds,
    name,
    x,
    y,
    z,
  });

  await base.save();
  return base.toObject() as IBase;
};

/**
 * Retrieves all bases for a given guild.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Array<IBase>>} The bases.
 */
const getGuildBases = async (guildId: string): Promise<Array<IBase>> => {
  return BaseModel.find({ guildId });
};

/**
 * Retrieves all bases for a given user.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord IDs.
 * @returns {Promise<Array<IBase>>} The bases.
 */
const getUserBases = async (
  guildId: string,
  userId: string): Promise<Array<IBase>> => {
  return BaseModel.find({
    guildId,
    userIds: {
      $contains: userId,
    },
  });
};

/**
 * Returns whether a user has a base saved.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord IDs.
 * @returns {Promise<boolean>} Whether the user has a base saved.
 */
const userHasBase = async (
  guildId: string,
  userId: string): Promise<boolean> => {
  return (await BaseModel.find({
    guildId,
    userIds: {
      $contains: userId,
    },
  })).length > 0;
};

/**
 * Updates a base's name.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord IDs.
 * @param {string} baseId ID of the base to update.
 * @param {string} name New base name.
 * @returns {Promise<Query>} Response to query.
 */
const updateBaseName = async (
  guildId: string,
  userId: string,
  baseId: string,
  name: string) => {
  const query = {
    _id: baseId,
    guildId,
    userIds: {
      $contains: userId,
    },
  };

  const update = {
    $set: {
      name,
    },
  };

  return BaseModel.updateOne(query, update);
};

/**
 * Updates a base's coordinates.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord IDs.
 * @param {string} baseId ID of the base to update.
 * @param {number} x New X coordinate.
 * @param {number} y New Y coordinate.
 * @param {number} z New Z coordinate.
 * @returns {Promise<Query>} Response to query.
 */
const updateBaseCoordinates = async (
  guildId: string,
  userId: string,
  baseId: string,
  x: number,
  y: number,
  z: number) => {
  const query = {
    _id: baseId,
    guildId,
    userIds: {
      $contains: userId,
    },
  };

  const update = {
    $set: {
      x,
      y,
      z,
    },
  };

  return BaseModel.updateOne(query, update);
};

/**
 * Deletes a base from the database.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord IDs.
 * @returns {Promise<Query>} Response to query.
 */
const deleteUserBase = async (
  guildId: string,
  userId: string,
  name: string | undefined = undefined) => {
  const query: Record<string, any> = {
    guildId,
    userIds: {
      $contains: userId,
    },
  };

  if (name) {
    query.name = name;
  }

  return BaseModel.deleteOne(query);
};

/**
 * Deletes all bases from the database for a given user.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord IDs.
 * @returns {Promise<Query>} Response to query.
 */
const deleteAllUserBases = async (
  guildId: string,
  userId: string) => {
  return BaseModel.deleteMany({
    guildId,
    userIds: {
      $contains: userId,
    },
  });
};

/**
 * Deletes all bases from the database for a given guild.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Query>} Response to query.
 */
const deleteAllGuildBases = async (guildId: string) => {
  return BaseModel.deleteMany({ guildId});
};

export default {
  createBase,
  getGuildBases,
  getUserBases,
  userHasBase,
  deleteUserBase,
  deleteAllUserBases,
  deleteAllGuildBases,
};
