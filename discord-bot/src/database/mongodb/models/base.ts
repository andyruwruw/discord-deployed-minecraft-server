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
  owners: {
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
  created: {
    type: Date,
    default: new Date(),
  },
});

export const BaseModel = mongoose.model('BaseModel', schema);
