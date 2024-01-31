// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  discord: {
    type: String,
    required: true,
  },

  minecraft: {
    type: String,
    required: true,
  },

  achievementUpdate: {
    type: Number,
    default: 0,
  },

  achievements: {
    type: Number,
    default: 0,
  },

  deathUpdate: {
    type: Number,
    default: 0,
  },

  deaths: {
    type: Number,
    default: 0,
  },

  logins: {
    type: Number,
    default: 0,
  },

  hoursUpdate: {
    type: Number,
    default: 0,
  },

  hours: {
    type: Number,
    default: 0,
  },
});

export const PlayerModel = model('Player', schema);
