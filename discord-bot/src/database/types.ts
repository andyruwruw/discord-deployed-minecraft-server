interface Ownable {
  _id?: string;
  guildId: string;
  userIds: Array<string>;
}

interface MinecraftLocation {
  name: string;
  x: number;
  y: number;
  z: number;
  created: Date;
}

export interface IBase extends Ownable, MinecraftLocation {}

export interface IGuild {
  id: string;
  ip: string;
  port: number;
  generalChannelId: string;
  baseChannelId: string;
  shopsChannelId: string;
  eventsChannelId: string;
  commandListChannelId: string;
  commandsChannelId: string;
  logsChannelId: string;
  adminRoleId: string;
  onlineRoleId: string;
  offlineRoleId: string;
  playtimeLeaderRoleId: string;
  playtimeTier1RoleId: string;
  playtimeTier2RoleId: string;
  playtimeTier3RoleId: string;
  playtimeTier4RoleId: string;
  playtimeTier5RoleId: string;
  playtimeTier6RoleId: string;
  playtimeTier7RoleId: string;
  achievementsLeaderRoleId: string;
  achievementsMaxedRoleId: string;
  joined: Date;
}

export interface IShopItem {
  id: string;
  quantity: number;
  priceId: string;
  priceQuanity: number;
}

export interface IShop extends Ownable, MinecraftLocation {
  description: string;
  items: Array<IShopItem>;
}

export interface IUserActivity {
  guildId: string;
  userId: string;
  start: Date;
  end: Date;
}

export interface IUser {
  id: string;
  username: string;
  guildId: string;
  minecraftUsername: string;
  totalHours: number;
  achievements: Array<string>;
}

export interface BaseQueries {
  createBase: (guildId: string, userIds: Array<string>, x: number, y: number, z: number, name?: string) => Promise<IBase>;
  getGuildBases: (guildId: string) => Promise<Array<IBase>>;
  getUserBases: (guildId: string, userId: string) => Promise<Array<IBase>>;
  userHasBase: (guildId: string, userId: string) => Promise<boolean>;
  updateBaseName: (guildId: string, userId: string, baseId: string, name: string) => Promise<any>;
  updateBaseCoordinates: (guildId: string, userId: string, baseId: string, x: number, y: number, z: number) => Promise<any>;
  deleteUserBase: (guildId: string, userId: string, baseId: string) => Promise<any>;
  deleteAllUserBases: (guildId: string, userId: string) => Promise<any>;
  deleteAllGuildBases: (guildId: string) => Promise<any>;
}

export interface GuildQueries {
  createGuild: (guildId: string) => Promise<IGuild>;
  getGuild: (guildId: string) => Promise<IGuild>;
  getGuildByIp: (ip: string) => Promise<IGuild>;
  getGuilds: () => Promise<Array<IGuild>>;
  updateGuildIp: (guildId: string, ip: string) => Promise<any>;
  updateGuildPort: (guildId: string, port: number) => Promise<any>;
  updateGuildGeneralChannel: (guildId: string, channelId: string) => Promise<any>;
  updateGuildBaseChannel: (guildId: string, channelId: string) => Promise<any>;
  updateGuildShopsChannel: (guildId: string, channelId: string) => Promise<any>;
  updateGuildEventsChannel: (guildId: string, channelId: string) => Promise<any>;
  updateGuildCommandListChannel: (guildId: string, channelId: string) => Promise<any>;
  updateGuildCommandsChannel: (guildId: string, channelId: string) => Promise<any>;
  updateGuildLogsChannel: (guildId: string, channelId: string) => Promise<any>;
  updateGuildAdminRole: (guildId: string, roleId: string) => Promise<any>;
  updateGuildOnlineRole: (guildId: string, roleId: string) => Promise<any>;
  updateGuildOfflineRole: (guildId: string, roleId: string) => Promise<any>;
  updateGuildPlaytimeLeaderRole: (guildId: string, roleId: string) => Promise<any>;
  updateGuildPlaytimeTier1Role: (guildId: string, roleId: string) => Promise<any>;
  updateGuildPlaytimeTier2Role: (guildId: string, roleId: string) => Promise<any>;
  updateGuildPlaytimeTier3Role: (guildId: string, roleId: string) => Promise<any>;
  updateGuildPlaytimeTier4Role: (guildId: string, roleId: string) => Promise<any>;
  updateGuildPlaytimeTier5Role: (guildId: string, roleId: string) => Promise<any>;
  updateGuildPlaytimeTier6Role: (guildId: string, roleId: string) => Promise<any>;
  updateGuildPlaytimeTier7Role: (guildId: string, roleId: string) => Promise<any>;
  updateGuildAchievementsLeaderRole: (guildId: string, roleId: string) => Promise<any>;
  updateGuildAchievementsMaxedRole: (guildId: string, roleId: string) => Promise<any>;
  deleteGuild: (guildId: string) => Promise<any>;
}

export interface ShopQueries {
  createShop: (guildId: string, userIds: Array<string>, x: number, y: number, z: number, items?: Array<IShopItem>, name?: string, description?: string) => Promise<IShop>;
  getGuildShops: (guildId: string) => Promise<Array<IShop>>;
  getUserShops: (guildId: string, userId: string) => Promise<Array<IShop>>;
  userHasShop: (guildId: string, userId: string) => Promise<boolean>;
  updateShopName: (guildId: string, userId: string, shopId: string, name: string) => Promise<any>;
  updateShopDescription: (guildId: string, userId: string, shopId: string, description: string) => Promise<any>;
  updateShopCoordinates: (guildId: string, userId: string, shopId: string, x: number, y: number, z: number) => Promise<any>;
  updateShopItems: (guildId: string, userId: string, shopId: string, items: Array<IShopItem>) => Promise<any>;
  deleteUserShop: (guildId: string, userId: string, shopId: string) => Promise<any>;
  deleteAllUserShops: (guildId: string, userId: string) => Promise<any>;
  deleteAllGuildShops: (guildId: string) => Promise<any>;
}

export interface UserActivityQueries {
  createUserActivity: (guildId: string, userId: string, start: Date) => Promise<IUserActivity>;
  getGuildUserActivity: (guildId: string) => Promise<Array<IUserActivity>>;
  getUserActivity: (guildId: string, userId: string) => Promise<Array<IUserActivity>>
  deleteAllUserActivity: (guildId: string, userId: string) => Promise<any>;
  deleteAllGuildUserActivity: (guildId: string) => Promise<any>;
}

export interface UserQueries {
  createUser: (id: string, username: string, guildId: string) => Promise<IUser>
  getUser: (guildId: string, userId: string) => Promise<IUser>
  getUserByDiscordUsername: (guildId: string, username: string) => Promise<IUser>
  getUserByMinecraftUsername: (guildId: string, minecraftUsername: string) => Promise<IUser>
  getGuildUsers: (guildId: string) => Promise<Array<IUser>>
  updateUserMinecraftUsername: (guildId: string, userId: string, minecraftUsername: string) => Promise<any>;
  updateUserTotalHours: (guildId: string, userId: string, totalHours: number) => Promise<any>;
  addUserAchievement: (guildId: string, userId: string, achievement: string) => Promise<any>;
  deleteUser: ( guildId: string, userId: string) => Promise<any>;
  deleteGuildUsers: (guildId: string) => Promise<any>;
}
