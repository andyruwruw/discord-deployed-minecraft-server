import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  serverId: {
    type: String,
    required: true,
  },
  ec2InstanceId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Array,
    of: String,
    default: [],
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
  }
});

export const ShopModel = mongoose.model('ShopModel', schema);
