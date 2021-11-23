import { BaseModel } from '../models';

export const getBasesByServer = async (serverId: string) => {
  return await BaseModel.find({ serverId });
}

export const getBasesByPlayer = async (serverId: string, owner: string) => {
  return await BaseModel.find({
    serverId,
    owners: {
      $in: [ owner ],
    },
  });
}

/**
 * Returns whether a player has a base saved.
 *
 * @param {string} serverId Server player belongs to
 * @param {string} owner Player's minecraft username
 * @returns {boolean} Whether the player has a base saved.
 */
export const playerHasBase = async (serverId: string, owner: string) => {
  return (await BaseModel.find({
    serverId,
    owners: {
      $in: [ owner ],
    },
  })).length > 0;
}

export const createBase = async (
  serverId: string,
  ec2InstanceId: string,
  owners: Array<string>,
  x: Number,
  y: Number,
  z: Number): Promise<Base> => {
  const base = new BaseModel({
    serverId,
    ec2InstanceId,
    owners,
    x,
    y,
    z,
  });

  await base.save();

  return base.toObject() as Base;
}

/**
 * Deletes a base from the database.
 *
 * @param {string} serverId Server the base is from.
 * @param {string} owner Username of owner of the base. 
 */
export const deleteBase = async (serverId: string, owner: string) => {
  await BaseModel.deleteOne({
    serverId,
    owners: {
      $in: [ owner ],
    }
  });
}
