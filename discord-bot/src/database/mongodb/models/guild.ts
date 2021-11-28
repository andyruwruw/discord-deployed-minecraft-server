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
  adminRoleId: {
    type: String,
    defautl: 'unknown',
  },
  onlineRoleId: {
    type: String,
    defautl: 'unknown',
  },
  offlineRoleId: {
    type: String,
    defautl: 'unknown',
  },
  playtimeLeaderRoleId: {
    type: String,
    defautl: 'unknown',
  },
  playtimeTier1RoleId: {
    type: String,
    defautl: 'unknown',
  },
  playtimeTier2RoleId: {
    type: String,
    defautl: 'unknown',
  },
  playtimeTier3RoleId: {
    type: String,
    defautl: 'unknown',
  },
  playtimeTier4RoleId: {
    type: String,
    defautl: 'unknown',
  },
  playtimeTier5RoleId: {
    type: String,
    defautl: 'unknown',
  },
  playtimeTier6RoleId: {
    type: String,
    defautl: 'unknown',
  },
  playtimeTier7RoleId: {
    type: String,
    defautl: 'unknown',
  },
  achievementsLeaderRoleId: {
    type: String,
    defautl: 'unknown',
  },
  achievementsMaxedRoleId: {
    type: String,
    defautl: 'unknown',
  },
  joined: {
    type: Date,
    default: new Date(),
  },
});

export const GuildModel = mongoose.model('Guild', schema);
