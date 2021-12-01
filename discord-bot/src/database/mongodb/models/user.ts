// Packages
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  minecraftUsername: {
    type: String,
    default: '',
  },
  totalHours: {
    type: Number,
    default: 0,
  },
  achievements: {
    type: Array,
    of: String,
    default: [],
  },
});

export const UserModel = mongoose.model('UserModel', schema);
