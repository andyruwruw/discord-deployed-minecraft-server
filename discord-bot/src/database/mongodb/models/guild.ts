// Packages
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    default: 'unknown',
  },
  port: {
    type: Number,
    default: 3000,
  },
  generalChannelId: {
    type: String,
    default: 'unknown',
  },
  baseChannelId: {
    type: String,
    default: 'unknown',
  },
  shopsChannelId: {
    type: String,
    default: 'unknown',
  },
  eventsChannelId: {
    type: String,
    default: 'unknown',
  },
  commandListChannelId: {
    type: String,
    default: 'unknown',
  },
  commandsChannelId: {
    type: String,
    default: 'unknown',
  },
  logsChannelId: {
    type: String,
    default: 'unknown',
  },
  achievementsChannelId: {
    type: String,
    default: 'unknown',
  },
  adminRoleId: {
    type: String,
    default: 'unknown',
  },
  onlineRoleId: {
    type: String,
    default: 'unknown',
  },
  mostDeathsRoleId: {
    type: String,
    default: 'unknown',
  },
  playtimeLeaderRoleId: {
    type: String,
    default: 'unknown',
  },
  playtimeTier1RoleId: {
    type: String,
    default: 'unknown',
  },
  playtimeTier2RoleId: {
    type: String,
    default: 'unknown',
  },
  playtimeTier3RoleId: {
    type: String,
    default: 'unknown',
  },
  playtimeTier4RoleId: {
    type: String,
    default: 'unknown',
  },
  playtimeTier5RoleId: {
    type: String,
    default: 'unknown',
  },
  playtimeTier6RoleId: {
    type: String,
    default: 'unknown',
  },
  playtimeTier7RoleId: {
    type: String,
    default: 'unknown',
  },
  achievementsLeaderRoleId: {
    type: String,
    default: 'unknown',
  },
  achievementsMaxedRoleId: {
    type: String,
    default: 'unknown',
  },
  joined: {
    type: Date,
    default: new Date(),
  },
});

export const GuildModel = mongoose.model('Guild', schema);
