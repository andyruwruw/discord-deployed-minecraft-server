// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  id: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },
});

export const RoleModel = model('Role', schema);
