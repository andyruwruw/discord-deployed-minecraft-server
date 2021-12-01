// Packages
import mongoose from 'mongoose';

// Local Imports
import { DEFAULT_DIMENSION } from '../../../config';

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
  dimension: {
    type: String,
    default: DEFAULT_DIMENSION,
  },
  created: {
    type: Date,
    default: new Date(),
  },
});

export const BaseModel = mongoose.model('BaseModel', schema);
