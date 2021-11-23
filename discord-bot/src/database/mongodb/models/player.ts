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
  totalHours: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: 'none',
  },
});

export const PlayerModel = mongoose.model('PlayerModel', schema);
