import mongoose from 'mongoose';

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
