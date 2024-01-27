// Packages
import fs from 'fs';
import path from 'path';

// Local Imports
import { ENCODING } from '../config/minecraft';
import { Environment } from '../helpers/environment';

/**
 * Automatically sets required server properties.
 */
export const editServerProperties = async (): Promise<void> => {
  const pathToServerProperties = path.join(
    __dirname,
    '../minecraft/server.properties',
  );

  const data = await fs.readFileSync(
    pathToServerProperties,
    ENCODING,
  );

  let editedProperties = data.replace(/enable-rcon=[a-yA-Y]*$/gim, 'enable-rcon=true')
    .replace(/rcon.port=[0-9]*$/gim, `rcon.port=${Environment.getRconPort()}`)
    .replace(/rcon.password=[a-yA-Y0-9]*$/gim, `rcon.password=${Environment.getRconPassword()}`)
    .replace(/broadcast-rcon-to-ops=[a-yA-Y]*$/gim, 'broadcast-rcon-to-ops=false')
    .replace(/white-list=[a-yA-Y]*$/gim, 'white-list=true')
    .replace(/enforce-whitelist=[a-yA-Y]*$/gim, 'enforce-whitelist=true');

  await fs.writeFileSync(
    pathToServerProperties,
    editedProperties,
    ENCODING,
  );
};
