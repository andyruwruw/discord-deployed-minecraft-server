// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  by: {
    type: String,
    required: true,
  },

  date: {
    type: Number,
    required: true,
  },
});

export const ScheduledRestartModel = model('ScheduledRestart', schema);
