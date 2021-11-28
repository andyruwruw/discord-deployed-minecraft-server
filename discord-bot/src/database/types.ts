interface Ownable {
  guildId: string;
  userIds: Array<string>;
};

interface MinecraftLocation {
  name: string;
  x: number;
  y: number;
  z: number;
  created: Date;
};

export interface IBase extends Ownable, MinecraftLocation {};

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
  logChannelId: string;
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
};

export interface IShopItem {
  id: string;
  quantity: number;
  priceId: string;
  priceQuanity: number;
};

export interface IShop extends Ownable, MinecraftLocation {
  description: string;
  items: Array<IShopItem>;
};

export interface IUserActivity {
  guildId: string;
  userId: string;
  start: Date;
  end: Date;
};

export interface IUser {
  id: string;
  username: string;
  guildId: string;
  minecraftUsername: string;
  totalHours: number;
  achievements: Array<string>;
};
