// Local Imports
import {
  OAuth2Guild,
  TextChannel,
  Role as DiscordRole,
  GuildMember,
} from 'discord.js';
import { Server } from '..';

// Types
import {
  Channel,
  ChannelType,
  Role,
  RoleType,
} from '../types/tables';

/**
 * Static references to Discord items.
 */
export class DiscordReferences {
  /**
   * Static references to Discord channels.
   */
  static Channel = {
    broadcast: null,

    console: null,

    'bulletin-board': null,

    general: null,

    whitelist: null,
  } as Record<ChannelType, TextChannel | null>;

  /**
   * Static references to Discord roles.
   */
  static Role = {
    op: null,

    online: null,

    dirt: null,

    wood: null,

    stone: null,

    iron: null,

    gold: null,

    diamond: null,

    netherite: null,

    'most-playtime': null,

    'most-achievements': null,

    'all-achievements': null,

    'most-deaths': null,
  } as Record<RoleType, DiscordRole | null>;

  /**
   * Static references to guild players.
   */
  static PlayerByDiscord = {
  } as Record<string, GuildMember | null>;

  /**
   * Static references to guild players.
   */
  static PlayerByMinecraft = {
  } as Record<string, GuildMember | null>

  /**
   * Retrieves a given channel.
   *
   * @param {ChannelType} type Type of channel.
   * @returns {Promise<Channel | null>} Channel if assigned.
   */
  static async getChannel(type: ChannelType): Promise<TextChannel | null> {
    if (DiscordReferences.Channel[type]) {
      return DiscordReferences.Channel[type] as TextChannel;
    }

    const channel = await Server.Database.channels.findOne({
      type,
    });

    if (channel) {
      const discordChannel = await Server.Discord.channels.fetch(channel.id);

      if (discordChannel) {
        DiscordReferences.Channel[type] = discordChannel as TextChannel;
      }
    }

    return DiscordReferences.Channel[type];
  }

  /**
   * Retrieves a given role.
   *
   * @param {RoleType} type Type of role.
   * @returns {Promise<Role | null>} Role if assigned.
   */
  static async getRole(type: RoleType): Promise<DiscordRole | null> {
    if (DiscordReferences.Role[type]) {
      return DiscordReferences.Role[type] as DiscordRole;
    }

    const role = await Server.Database.roles.findOne({
      type,
    });

    if (role) {
      const guilds = await Server.Discord.guilds.fetch();
      const guild = await ((guilds.at(0) as OAuth2Guild).fetch());

      const discordRole = await guild.roles.fetch(role.id);
  
      DiscordReferences.Role[type] = discordRole;
    }

    return DiscordReferences.Role[type];
  }

  /**
   * Retrieves a given player.
   *
   * @param {string} discord Id of the player.
   * @param {string} minecraft Id of the player.
   * @returns {Promise<GuildMember | null>} Player if assigned.
   */
  static async getPlayer(
    discord = '',
    minecraft = '',
  ): Promise<GuildMember | null> {
    if (discord.length
      && DiscordReferences.PlayerByDiscord[discord]) {
      return DiscordReferences.PlayerByDiscord[discord] as GuildMember;
    } else if (minecraft.length
      && DiscordReferences.PlayerByMinecraft[minecraft]) {
      return DiscordReferences.PlayerByMinecraft[minecraft] as GuildMember;
    }

    let player;

    if (discord.length) {
      player = await Server.Database.players.findOne({
        discord,
      });
    } else if (minecraft.length) {
      player = await Server.Database.players.findOne({
        minecraft,
      });
    } else {
      return null;
    }

    if (player) {
      const guilds = await Server.Discord.guilds.fetch();
      const guild = await ((guilds.at(0) as OAuth2Guild).fetch());

      const member = await guild.members.fetch({
        user: player.discord,
      });

      if (member) {
        DiscordReferences.PlayerByDiscord[player.discord] = member as GuildMember;
        DiscordReferences.PlayerByMinecraft[player.minecraft] = member as GuildMember;
      }
    }

    if (discord.length) {
      return DiscordReferences.PlayerByDiscord[discord];
    } else if (minecraft.length) {
      return DiscordReferences.PlayerByMinecraft[minecraft];
    } else {
      return null;
    }
  }

  /**
   * Updates all references.
   */
  static async updateAllReferences(): Promise<void> {
    const channels = Object.keys(DiscordReferences.Channel) as ChannelType[];

    const promises = [];

    for (let i = 0; i < channels.length; i += 1) {
      DiscordReferences.Channel[channels[i]] = null;

      promises.push(DiscordReferences.getChannel(channels[i]));
    }

    const roles = Object.keys(DiscordReferences.Role) as RoleType[];

    for (let i = 0; i < roles.length; i += 1) {
      DiscordReferences.Role[roles[i]] = null;

      promises.push(DiscordReferences.getRole(roles[i]));
    }

    const members = await Server.Database.players.find();

    for (let i = 0; i < members.length; i += 1) {
      DiscordReferences.PlayerByDiscord[members[i].discord] = null;
      DiscordReferences.PlayerByMinecraft[members[i].minecraft] = null;

      promises.push(DiscordReferences.getPlayer(
        members[i].discord,
      ));
    }

    await Promise.all(promises);
  }
}
