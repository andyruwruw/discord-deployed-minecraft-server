import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  userIds: {
    type: Array,
    of: String,
    required: true,
  },
  name: {
    type: String,
    default: 'Home',
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  z: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: new Date(),
  },
});

export const BaseModel = mongoose.model('BaseModel', schema);
