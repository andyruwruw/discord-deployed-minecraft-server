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
  username: {
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

export const PlayerActivityModel = mongoose.model('PlayerActivityModel', schema);
