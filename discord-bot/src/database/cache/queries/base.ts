// Packages
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import {
  IBase,
  BaseQueries,
} from '../../types';

export let bases: Array<IBase> = [];

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
  const base: IBase = {
    _id: uuidv4(),
    guildId,
    userIds,
    name,
    x,
    y,
    z,
    created: new Date(),
  };

  bases.push(base);
  return base;
};

/**
 * Retrieves all bases for a given guild.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Array<IBase>>} The bases.
 */
const getGuildBases = async (guildId: string): Promise<Array<IBase>> => {
  return bases.filter((base: IBase) => base.guildId === guildId);
};

/**
 * Retrieves all bases for a given user.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord ID.
 * @returns {Promise<Array<IBase>>} The bases.
 */
const getUserBases = async (
  guildId: string,
  userId: string): Promise<Array<IBase>> => {
  return bases.filter((base: IBase) => base.guildId === guildId && base.userIds.includes(userId));
};

/**
 * Returns whether a user has a base saved.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord ID.
 * @returns {Promise<boolean>} Whether the user has a base saved.
 */
const userHasBase = async (
  guildId: string,
  userId: string): Promise<boolean> => {
  for (let base of bases) {
    if (base.guildId === guildId && base.userIds.includes(userId)) {
      return true;
    }
  }
  return false;
};

/**
 * Updates a base's name.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord ID.
 * @param {string} baseId ID of the base to update.
 * @param {string} name New base name.
 * @returns {Promise<Query>} Response to query.
 */
const updateBaseName = async (
  guildId: string,
  userId: string,
  baseId: string,
  name: string) => {
  const index = bases.findIndex((base: IBase) => base.guildId === guildId && base.userIds.includes(userId) && base._id === baseId);

  if (index !== -1) {
    bases[index].name = name;
  }
};

/**
 * Updates a base's coordinates.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord ID.
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
  const index = bases.findIndex((base: IBase) => base.guildId === guildId && base.userIds.includes(userId) && base._id === baseId);

  if (index !== -1) {
    bases[index].x = x;
    bases[index].y = y;
    bases[index].z = z;
  }
};

/**
 * Deletes a base from the database.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord ID.
 * @param {string} baseId ID of the base to delete.
 * @returns {Promise<Query>} Response to query.
 */
const deleteUserBase = async (
  guildId: string,
  userId: string,
  baseId: string) => {
  const index = bases.findIndex((base: IBase) => base.guildId === guildId && base.userIds.includes(userId) && base._id === baseId);

  if (index !== -1) {
    bases.splice(index, 1);
  }
};

/**
 * Deletes all bases from the database for a given user.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the base's Discord ID.
 * @returns {Promise<Query>} Response to query.
 */
const deleteAllUserBases = async (
  guildId: string,
  userId: string) => {
  bases = bases.filter((base: IBase) => base.guildId !== guildId || !base.userIds.includes(userId));
};

/**
 * Deletes all bases from the database for a given guild.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Query>} Response to query.
 */
const deleteAllGuildBases = async (guildId: string) => {
  bases = bases.filter((base: IBase) => base.guildId !== guildId);
};

export default {
  createBase,
  getGuildBases,
  getUserBases,
  userHasBase,
  updateBaseName,
  updateBaseCoordinates,
  deleteUserBase,
  deleteAllUserBases,
  deleteAllGuildBases,
} as BaseQueries;
