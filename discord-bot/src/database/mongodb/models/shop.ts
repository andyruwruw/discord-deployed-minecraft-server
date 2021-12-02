// Packages
import mongoose from 'mongoose';

// Local Imports
import { DEFAULT_DIMENSION } from '../../../config';

const schema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 'Unnamed Shop',
  },
  userIds: {
    type: Array,
    of: String,
    required: true,
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
  description: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    of: {
      id: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      priceId: {
        type: String,
        required: true,
      },
      priceQuantity: {
        type: Number,
        required: true,
      },
    },
  },
  created: {
    type: Date,
    default: new Date(),
  },
});

export const ShopModel = mongoose.model('ShopModel', schema);
