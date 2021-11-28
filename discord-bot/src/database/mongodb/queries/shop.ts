// Local Imports
import {
  IShop,
  IShopItem,
} from '../../types';
import { ShopModel } from '../models';

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
  const shop = new ShopModel({
    description,
    guildId,
    items,
    name,
    userIds,
    x,
    y,
    z,
  });

  await shop.save();
  return shop.toObject() as IShop;
};

export default {
  createShop,
};
