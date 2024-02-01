// Packages
import fs from 'fs';
import path from 'path';

// Local Imports
import { ServerProperties } from '../minecraft/properties';
import { ENCODING } from '../config/minecraft';
import { Monitor } from '../helpers/monitor';

/**
 * Automatically sets required server properties.
 * 
 * @param {boolean} fresh Whether this server has been run before.
 */
export const editServerProperties = async (fresh = false): Promise<void> => {
  try {
    const pathToServerProperties = path.join(
      __dirname,
      '../minecraft/server.properties',
    );
  
    const data = await fs.readFileSync(
      pathToServerProperties,
      ENCODING,
    );

    await fs.writeFileSync(
      pathToServerProperties,
      await ServerProperties.EditServerProperties(data),
      ENCODING,
    );
  } catch(error) {
    await Monitor.trace(
      'editServerProperties',
      `${error}`,
      Monitor.Layer.WARNING,
    );
  }
};
