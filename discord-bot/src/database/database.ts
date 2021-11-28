// Local Imports
import {
  BaseQueries,
  GuildQueries,
  IBase,
  IGuild,
  IShop,
  IShopItem,
  IUser,
  IUserActivity,
  ShopQueries,
  UserActivityQueries,
  UserQueries,
} from './types';

/**
 * Generic database interface.
 */
export class Database implements BaseQueries, GuildQueries, ShopQueries, UserActivityQueries, UserQueries {
  /**
   * Minecraft base queries.
   */
  base: BaseQueries | undefined;

  /**
   * Discord guild queries.
   */
  guild: GuildQueries | undefined;

  /**
   * Minecraft shop queries.
   */
  shop: ShopQueries | undefined;

  /**
   * User activity queries.
   */
  userActivities: UserActivityQueries | undefined;

  /**
   * User queries.
   */
  user: UserQueries | undefined;

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    throw new Error('Attempted to connect to Generic Database.');
  }

  async isConnected(): Promise<boolean> {
    return true;
  }

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
  async createBase(
    guildId: string,
    userIds: string[],
    x: number,
    y: number,
    z: number,
    name: string | undefined): Promise<IBase> {
    return (this.base as BaseQueries).createBase(
      guildId,
      userIds,
      x,
      y,
      z,
      name,
    );
  }

  /**
   * Retrieves all bases for a given guild.
   *
   * @param {string} guildId Discord guild ID.
   * @returns {Promise<Array<IBase>>} The bases.
   */
  async getGuildBases(guildId: string): Promise<IBase[]> {
    return (this.base as BaseQueries).getGuildBases(guildId);
  }

  /**
   * Retrieves all bases for a given user.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the base's Discord ID.
   * @returns {Promise<Array<IBase>>} The bases.
   */
  async getUserBases(
    guildId: string,
    userId: string): Promise<IBase[]> {
    return (this.base as BaseQueries).getUserBases(
      guildId,
      userId,
    );
  }

  /**
   * Returns whether a user has a base saved.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the base's Discord ID.
   * @returns {Promise<boolean>} Whether the user has a base saved.
   */
  async userHasBase(
    guildId: string,
    userId: string): Promise<boolean> {
    return (this.base as BaseQueries).userHasBase(
      guildId,
      userId,
    );
  }

  /**
   * Updates a base's name.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the base's Discord ID.
   * @param {string} baseId ID of the base to update.
   * @param {string} name New base name.
   * @returns {Promise<Query>} Response to query.
   */
  async updateBaseName(
    guildId: string, 
    userId: string, 
    baseId: string, 
    name: string): Promise<any> {
    return (this.base as BaseQueries).updateBaseName(
      guildId,
      userId,
      baseId,
      name,
    );
  }

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
  async updateBaseCoordinates(
    guildId: string, 
    userId: string, 
    baseId: string, 
    x: number, 
    y: number, 
    z: number): Promise<any> {
    return (this.base as BaseQueries).updateBaseCoordinates(
      guildId,
      userId,
      baseId,
      x,
      y,
      z,
    );
  }

  /**
   * Deletes a base from the database.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the base's Discord ID.
   * @param {string} baseId ID of the base to delete.
   * @returns {Promise<Query>} Response to query.
   */
  async deleteUserBase(
    guildId: string, 
    userId: string, 
    baseId: string): Promise<any> {
    return (this.base as BaseQueries).deleteUserBase(
      guildId,
      userId,
      baseId,
    );
  }

  /**
   * Deletes all bases from the database for a given user.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the base's Discord ID.
   * @returns {Promise<Query>} Response to query.
   */
  async deleteAllUserBases(
    guildId: string, 
    userId: string): Promise<any> {
    return (this.base as BaseQueries).deleteAllUserBases(
      guildId,
      userId,
    );
  }

  /**
   * Deletes all bases from the database for a given guild.
   *
   * @param {string} guildId Discord guild ID.
   * @returns {Promise<Query>} Response to query.
   */
  async deleteAllGuildBases(guildId: string): Promise<any> {
    return (this.base as BaseQueries).deleteAllGuildBases(guildId);
  }

  /**
   * Creates a new guild in the database.
   *
   * @param {string} guildId Discord guild ID.
   * @returns {Promise<IGuild>} Guild object.
   */
  async createGuild(guildId: string): Promise<IGuild> {
    return (this.guild as GuildQueries).createGuild(guildId);
  }

  /**
   * Retrieves a guild from the database.
   *
   * @param {string} guildId Discord guild ID.
   * @returns {Promise<IGuild>} Guild object.
   */
  async getGuild(guildId: string): Promise<IGuild> {
    return (this.guild as GuildQueries).getGuild(guildId);
  }

  /**
   * Retrieves a guild from the database by IP address.
   *
   * @param {string} ip Server IP address.
   * @returns {Promise<IGuild>} Guild object.
   */
  async getGuildByIp(ip: string): Promise<IGuild> {
    return (this.guild as GuildQueries).getGuildByIp(ip);
  };

  /**
   * Retrieves all guilds from the database.
   *
   * @returns {Promise<Array<IGuild>>} Guild object.
   */
  async getGuilds(): Promise<IGuild[]> {
    return (this.guild as GuildQueries).getGuilds();
  }

  /**
   * Updates a guild's server IP address.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} ip Server IP address.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildIp(
    guildId: string, 
    ip: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildIp(
      guildId,
      ip,
    );
  }

  /**
   * Updates a guild's server port.
   *
   * @param {string} guildId Discord guild ID.
   * @param {number} port Server port.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildPort(
    guildId: string, 
    port: number): Promise<any> {
    return (this.guild as GuildQueries).updateGuildPort(
      guildId,
      port,
    );
  }

  /**
   * Updates a guild's general channel ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} channelId Discord channel ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildGeneralChannel(
    guildId: string,
    channelId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildGeneralChannel(
      guildId,
      channelId,
    );
  }

  /**
   * Updates a guild's base channel ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} channelId Discord channel ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildBaseChannel(
    guildId: string,
    channelId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildBaseChannel(
      guildId,
      channelId,
    );
  }

  /**
   * Updates a guild's shops channel ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} channelId Discord channel ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildShopsChannel(
    guildId: string,
    channelId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildShopsChannel(
      guildId,
      channelId,
    );
  }

  /**
   * Updates a guild's events channel ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} channelId Discord channel ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildEventsChannel(
    guildId: string,
    channelId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildEventsChannel(
      guildId,
      channelId,
    );
  }

  /**
   * Updates a guild's command list channel ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} channelId Discord channel ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildCommandListChannel(
    guildId: string,
    channelId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildCommandListChannel(
      guildId,
      channelId,
    );
  }

  /**
   * Updates a guild's commands channel ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} channelId Discord channel ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildCommandsChannel(
    guildId: string,
    channelId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildCommandsChannel(
      guildId,
      channelId,
    );
  }

  /**
   * Updates a guild's logs channel ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} channelId Discord channel ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildLogsChannel(
    guildId: string,
    channelId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildLogsChannel(
      guildId,
      channelId,
    );
  }

  /**
   * Updates a guild's admin role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildAdminRole(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildAdminRole(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's online role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildOnlineRole(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildOnlineRole(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's offline role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildOfflineRole(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildOfflineRole(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's playtime leader role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildPlaytimeLeaderRole(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildPlaytimeLeaderRole(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's playtime tier 1 role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildPlaytimeTier1Role(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildPlaytimeTier1Role(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's playtime tier 2 role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildPlaytimeTier2Role(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildPlaytimeTier2Role(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's playtime tier 3 role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildPlaytimeTier3Role(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildPlaytimeTier3Role(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's playtime tier 4 role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildPlaytimeTier4Role(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildPlaytimeTier4Role(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's playtime tier 5 role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildPlaytimeTier5Role(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildPlaytimeTier5Role(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's playtime tier 6 role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildPlaytimeTier6Role(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildPlaytimeTier6Role(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's playtime tier 7 role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildPlaytimeTier7Role(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildPlaytimeTier7Role(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's achievements leader role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildAchievementsLeaderRole(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildAchievementsLeaderRole(
      guildId,
      roleId,
    );
  }

  /**
   * Updates a guild's achievements maxed role ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} roleId Discord role ID.
   * @returns {Promise<Query>} Response to query.
   */
  async updateGuildAchievementsMaxedRole(
    guildId: string,
    roleId: string): Promise<any> {
    return (this.guild as GuildQueries).updateGuildAchievementsMaxedRole(
      guildId,
      roleId,
    );
  }

  /**
   * Deletes a guild from the database.
   *
   * @param {string} guildId Discord guild ID.
   * @returns {Promise<Query>} Response to query.
   */
  async deleteGuild(guildId: string): Promise<any> {
    return (this.guild as GuildQueries).deleteGuild(guildId);
  }

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
  async createShop(
    guildId: string,
    userIds: string[],
    x: number,
    y: number,
    z: number,
    items: IShopItem[] | undefined,
    name: string | undefined,
    description: string | undefined): Promise<IShop> {
    return (this.shop as ShopQueries).createShop(
      guildId,
      userIds,
      x,
      y,
      z,
      items,
      name,
      description,
    );
  }

  /**
   * Retrieves all shops for a given guild.
   *
   * @param {string} guildId Discord guild ID.
   * @returns {Promise<Array<IShop>>} The shops.
   */
  async getGuildShops(guildId: string): Promise<IShop[]> {
    return (this.shop as ShopQueries).getGuildShops(guildId);
  }

  /**
   * Retrieves all shops for a given user.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the shop's Discord ID.
   * @returns {Promise<Array<IBase>>} The shops.
   */
  async getUserShops(
    guildId: string,
    userId: string): Promise<IShop[]> {
    return (this.shop as ShopQueries).getUserShops(guildId, userId);
  }

  /**
   * Returns whether a user has a shop saved.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the shop's Discord ID.
   * @returns {Promise<boolean>} Whether the user has a shop saved.
   */
  async userHasShop(
    guildId: string,
    userId: string): Promise<boolean> {
    return (this.shop as ShopQueries).userHasShop(guildId, userId);
  }

  /**
   * Updates a shop's name.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the shop's Discord ID.
   * @param {string} shopId ID of the shop to update.
   * @param {string} name New shop name.
   * @returns {Promise<Query>} Response to query.
   */
  async updateShopName(
    guildId: string, 
    userId: string, 
    shopId: string,
    name: string): Promise<any> {
    return (this.shop as ShopQueries).updateShopName(
      guildId,
      userId,
      shopId,
      name,
    );
  }

  /**
   * Updates a shop's description.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the shop's Discord ID.
   * @param {string} shopId ID of the shop to update.
   * @param {string} description New shop description.
   * @returns {Promise<Query>} Response to query.
   */
  async updateShopDescription(
    guildId: string, 
    userId: string, 
    shopId: string,
    description: string): Promise<any> {
    return (this.shop as ShopQueries).updateShopDescription(
      guildId,
      userId,
      shopId,
      description,
    );
  }

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
  async updateShopCoordinates(
    guildId: string, 
    userId: string, 
    shopId: string, 
    x: number, 
    y: number, 
    z: number): Promise<any> {
    return (this.shop as ShopQueries).updateShopCoordinates(
      guildId,
      userId,
      shopId,
      x,
      y,
      z,
    );
  }

  /**
   * Updates a shop's items.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the shop's Discord ID.
   * @param {string} shopId ID of the shop to update.
   * @param {Array<IShopItem>} items New shop items.
   * @returns {Promise<Query>} Response to query.
   */
  async updateShopItems(
    guildId: string, 
    userId: string, 
    shopId: string, 
    items: IShopItem[]): Promise<any> {
    return (this.shop as ShopQueries).updateShopItems(
      guildId,
      userId,
      shopId,
      items,
    );
  }

  /**
   * Deletes a shop from the database.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the shop's Discord ID.
   * @param {string} shopId ID of the shop to delete.
   * @returns {Promise<Query>} Response to query.
   */
  async deleteUserShop(
    guildId: string, 
    userId: string, 
    shopId: string): Promise<any> {
    return (this.shop as ShopQueries).deleteUserShop(
      guildId,
      userId,
      shopId,
    );
  }

  /**
   * Deletes all shops from the database for a given user.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId Owner of the shop's Discord ID.
   * @returns {Promise<Query>} Response to query.
   */
  async deleteAllUserShops(
    guildId: string, 
    userId: string): Promise<any> {
    return (this.shop as ShopQueries).deleteAllUserShops(
      guildId,
      userId,
    );
  }

  /**
   * Deletes all shops from the database for a given guild.
   *
   * @param {string} guildId Discord guild ID.
   * @returns {Promise<Query>} Response to query.
   */
  async deleteAllGuildShops(guildId: string): Promise<any> {
    return (this.shop as ShopQueries).deleteAllGuildShops(guildId);
  }

  /**
   * Creates a new user activity log.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId User's Discord ID.
   * @param {Date} start Date the user logged in.
   * @returns {Promise<IUserActivity>} The user activity.
   */
  async createUserActivity(
    guildId: string, 
    userId: string, 
    start: Date): Promise<IUserActivity> {
    return (this.userActivities as UserActivityQueries).createUserActivity(
      guildId,
      userId,
      start,
    );
  }

  /**
   * Retrieves all user activity for a given guild.
   *
   * @param {string} guildId Discord guild ID.
   * @returns {Promise<Array<IUserActivity>>} The user activity.
   */
  async getGuildUserActivity(guildId: string): Promise<IUserActivity[]> {
    return (this.userActivities as UserActivityQueries).getGuildUserActivity(guildId);
  }

  /**
   * Retrieves all user activity for a given user.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId User's Discord ID.
   * @returns {Promise<Array<IUserActivity>>} The user activity.
   */
  async getUserActivity(
    guildId: string, 
    userId: string): Promise<IUserActivity[]> {
    return (this.userActivities as UserActivityQueries).getUserActivity(
      guildId,
      userId,
    );
  }

  /**
   * Deletes all user activity from the database for a given user.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId User's Discord ID.
   * @returns {Promise<Query>} Response to query.
   */
  async deleteAllUserActivity(
    guildId: string, 
    userId: string): Promise<any> {
    return (this.userActivities as UserActivityQueries).deleteAllUserActivity(
      guildId,
      userId,
    );
  }

  /**
   * Deletes all user activity from the database for a given guild.
   *
   * @param {string} guildId Discord guild ID.
   * @returns {Promise<Query>} Response to query.
   */
  async deleteAllGuildUserActivity(guildId: string): Promise<any> {
    return (this.userActivities as UserActivityQueries).deleteAllGuildUserActivity(guildId);
  }

  /**
   * Creates a new user.
   *
   * @param {string} id The user's Discord ID.
   * @param {string} username The user's Discord username.
   * @param {string} guildId Discord guild ID.
   * @returns {Promise<IUser>} The created user.
   */
  async createUser(
    id: string, 
    username: string, 
    guildId: string): Promise<IUser> {
    return (this.user as UserQueries).createUser(
      id,
      username,
      guildId,
    );
  }

  /**
   * Retrieves a user by Discord ID.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} userId The user's Discord ID.
   * @returns {Promise<IUser>} The user.
   */
  async getUser(
    guildId: string, 
    userId: string): Promise<IUser> {
    return (this.user as UserQueries).getUser(
      guildId,
      userId,
    );
  }

  /**
   * Retrieves a user by Discord username.
   *
   * @param {string} guildId Discord guild ID.
   * @param {string} username The user's Discord username.
   * @returns {Promise<IUser>} The user.
   */
  async getUserByDiscordUsername(
    guildId: string, 
    username: string): Promise<IUser> {
    return (this.user as UserQueries).getUserByDiscordUsername(
      guildId,
      username,
    );
  }

  /**
   * Retrieves a user by Minecraft username.
   *
   * @param {string} guildId Discord guild ID. 
   * @param {string} minecraftUsername The user's Minecraft username. 
   * @returns {Promise<IUser>} The user.
   */
  async getUserByMinecraftUsername(
    guildId: string, 
    minecraftUsername: string): Promise<IUser> {
    return (this.user as UserQueries).getUserByMinecraftUsername(
      guildId,
      minecraftUsername,
    );
  }

  /**
   * Retrieves all users for a given guild.
   *
   * @param {string} guildId Discord guild ID. 
   * @returns {Promise<Array<IUser>>} The users.
   */
  async getGuildUsers(guildId: string): Promise<IUser[]> {
    return (this.user as UserQueries).getGuildUsers(guildId);
  }

  /**
   * Updates a user's Minecraft username.
   *
   * @param {string} guildId Discord guild ID. 
   * @param {string} userId The user's Discord ID.
   * @param {string} minecraftUsername The user's Minecraft username. 
   * @returns {Promise<Query>} Response to query.
   */
  async updateUserMinecraftUsername(
    guildId: string, 
    userId: string, 
    minecraftUsername: string): Promise<any> {
    return (this.user as UserQueries).updateUserMinecraftUsername(
      guildId,
      userId,
      minecraftUsername,
    );
  }

  /**
   * Updates a user's total hours.
   *
   * @param {string} guildId Discord guild ID. 
   * @param {string} userId The user's Discord ID.
   * @param {number} totalHours The user's total hours.
   * @returns {Promise<Query>} Response to query.
   */
  async updateUserTotalHours(
    guildId: string, 
    userId: string, 
    totalHours: number): Promise<any> {
    return (this.user as UserQueries).updateUserTotalHours(
      guildId,
      userId,
      totalHours,
    );
  }

  /**
   * Updates a user's achievements
   *
   * @param {string} guildId Discord guild ID. 
   * @param {string} userId The user's Discord ID.
   * @param {string} achievement User's new achievement.
   * @returns {Promise<Query>} Response to query.
   */
  async addUserAchievement(
    guildId: string, 
    userId: string, 
    achievement: string): Promise<any> {
    return (this.user as UserQueries).addUserAchievement(
      guildId,
      userId,
      achievement,
    );
  }

  /**
   * Deletes a user from the database by Discord ID.
   *
   * @param {string} guildId Discord guild ID. 
   * @param {string} userId The user's Discord ID.
   * @returns {Promise<Query>} Response to query.
   */
  async deleteUser(
    guildId: string, 
    userId: string): Promise<any> {
    return (this.user as UserQueries).deleteUser(
      guildId,
      userId,
    );
  }

  /**
   * Deletes all users from the database for a given guild.
   *
   * @param {string} guildId Discord guild ID. 
   * @returns {Promise<Query>} Response to query.
   */
  async deleteGuildUsers(guildId: string): Promise<any> {
    return (this.user as UserQueries).deleteGuildUsers(guildId);
  }
}
