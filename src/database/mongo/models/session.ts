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

  start: {
    type: Number,
    default: 0,
  },
});

export const SessionModel = model('Session', schema);
