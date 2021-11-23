import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  serverId: {
    type: String,
    required: true,
  },
});

export const Ec2InstanceModel = mongoose.model('Ec2InstanceModel', schema);
