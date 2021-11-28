import { v4 as uuidv4 } from 'uuid';

// Local Imports
import {
  IShop,
  IShopItem,
  ShopQueries,
} from '../../types';

export let shops: Array<IShop> = [];

/**
 * Creates a new shop.
 *
 * @param {string} guildId Discord guild ID.
 * @param {Array<string>} userIds Owners of the base's Discord IDs.
 * @param {number} x X coordinates of the base.
 * @param {number} y y coordinates of the base.
 * @param {number} z z coordinates of the base.
 * @param {Array<IShopItem>} items Items sold at the shop and prices.
 * @param {string} name Name of the shop.
 * @param {string} description Description of the shop.
 * @returns {Promise<IShop>} The created shop.
 */
const createShop = async (
  guildId: string,
  userIds: Array<string>,
  x: number,
  y: number,
  z: number,
  items: Array<IShopItem> = [],
  name: string = 'Unnamed Shop',
  description: string = ''): Promise<IShop> => {
  const shop: IShop = {
    _id: uuidv4(),
    guildId,
    name,
    userIds,
    x,
    y,
    z,
    description,
    items,
    created: new Date(),
  };

  shops.push(shop);
  return shop;
};

/**
 * Retrieves all shops for a given guild.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Array<IShop>>} The shops.
 */
const getGuildShops = async (guildId: string): Promise<Array<IShop>> => {
  return shops.filter((shop: IShop) => shop.guildId === guildId);
};

/**
 * Retrieves all shops for a given user.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the shop's Discord ID.
 * @returns {Promise<Array<IBase>>} The shops.
 */
const getUserShops = async (
  guildId: string,
  userId: string): Promise<Array<IShop>> => {
  return shops.filter((shop: IShop) => shop.guildId === guildId && shop.userIds.includes(userId));
};

/**
 * Returns whether a user has a shop saved.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the shop's Discord ID.
 * @returns {Promise<boolean>} Whether the user has a shop saved.
 */
const userHasShop = async (
  guildId: string,
  userId: string): Promise<boolean> => {
  for (let shop of shops) {
    if (shop.guildId === guildId && shop.userIds.includes(userId)) {
      return true;
    }
  }
  return false;
};

/**
 * Updates a shop's name.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the shop's Discord ID.
 * @param {string} shopId ID of the shop to update.
 * @param {string} name New shop name.
 * @returns {Promise<Query>} Response to query.
 */
const updateShopName = async (
  guildId: string,
  userId: string,
  shopId: string,
  name: string) => {
  const index = shops.findIndex((shop: IShop) => shop.guildId === guildId && shop.userIds.includes(userId) && shop._id === shopId);

  if (index !== -1) {
    shops[index].name = name;
  }
};

/**
 * Updates a shop's description.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the shop's Discord ID.
 * @param {string} shopId ID of the shop to update.
 * @param {string} description New shop description.
 * @returns {Promise<Query>} Response to query.
 */
const updateShopDescription = async (
  guildId: string,
  userId: string,
  shopId: string,
  description: string) => {
  const index = shops.findIndex((shop: IShop) => shop.guildId === guildId && shop.userIds.includes(userId) && shop._id === shopId);

  if (index !== -1) {
    shops[index].description = description;
  }
};

/**
 * Updates a shop's description.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the shop's Discord ID.
 * @param {string} shopId ID of the shop to update.
 * @param {number} x New X coordinate.
 * @param {number} y New Y coordinate.
 * @param {number} z New Z coordinate.
 * @returns {Promise<Query>} Response to query.
 */
const updateShopCoordinates = async (
  guildId: string,
  userId: string,
  shopId: string,
  x: number,
  y: number,
  z: number) => {
  const index = shops.findIndex((shop: IShop) => shop.guildId === guildId && shop.userIds.includes(userId) && shop._id === shopId);

  if (index !== -1) {
    shops[index].x = x;
    shops[index].y = y;
    shops[index].z = z;
  }
};

/**
 * Updates a shop's items.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the shop's Discord ID.
 * @param {string} shopId ID of the shop to update.
 * @param {Array<IShopItem>} items New shop items.
 * @returns {Promise<Query>} Response to query.
 */
const updateShopItems = async (
  guildId: string,
  userId: string,
  shopId: string,
  items: Array<IShopItem>) => {
  const index = shops.findIndex((shop: IShop) => shop.guildId === guildId && shop.userIds.includes(userId) && shop._id === shopId);

  if (index !== -1) {
    shops[index].items = items;
  }
}

/**
 * Deletes a shop from the database.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the shop's Discord ID.
 * @param {string} shopId ID of the shop to delete.
 * @returns {Promise<Query>} Response to query.
 */
const deleteUserShop = async (
  guildId: string,
  userId: string,
  shopId: string) => {
  const index = shops.findIndex((shop: IShop) => shop.guildId === guildId && shop.userIds.includes(userId) && shop._id === shopId);

  if (index !== -1) {
    shops.splice(index, 1);
  }
};

/**
 * Deletes all shops from the database for a given user.
 *
 * @param {string} guildId Discord guild ID.
 * @param {string} userId Owner of the shop's Discord ID.
 * @returns {Promise<Query>} Response to query.
 */
const deleteAllUserShops = async (
  guildId: string,
  userId: string) => {
  shops = shops.filter((shop: IShop) => shop.guildId !== guildId || !shop.userIds.includes(userId));
};

/**
 * Deletes all shops from the database for a given guild.
 *
 * @param {string} guildId Discord guild ID.
 * @returns {Promise<Query>} Response to query.
 */
const deleteAllGuildShops = async (guildId: string) => {
  shops = shops.filter((shop: IShop) => shop.guildId !== guildId);
};

export default {
  createShop,
  getGuildShops,
  getUserShops,
  userHasShop,
  updateShopName,
  updateShopDescription,
  updateShopCoordinates,
  updateShopItems,
  deleteUserShop,
  deleteAllUserShops,
  deleteAllGuildShops,
} as ShopQueries;
