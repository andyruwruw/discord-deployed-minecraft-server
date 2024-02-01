// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  discord: {
    type: String,
    default: 'unknown',
  },

  minecraft: {
    type: String,
    required: true,
  },

  achievement: {
    type: String,
    require: true,
  },

  updated: {
    type: Number,
    default: Date.now(),
  },
});

export const PlayerAchievementModel = model('PlayerAchievement', schema);
