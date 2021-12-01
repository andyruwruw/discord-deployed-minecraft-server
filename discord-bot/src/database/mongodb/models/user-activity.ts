// Packages
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    default: new Date(),
  },
});

export const UserActivityModel = mongoose.model('UserActivityModel', schema);
