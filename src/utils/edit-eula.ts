// Packages
import fs from 'fs';
import path from 'path';

// Local Imports
import { CONSOLE_DEFAULT_PREFIX } from '../config';
import { ENCODING } from '../config/minecraft';
import { EULA_APPROVED } from '../config/messages';
import { Monitor } from '../helpers/monitor';

/**
 * Automatically approves EULA.
 * 
 * @param {boolean} [state = true] What state to turn EULA.
 */
export const approveEula = async (state = true) => {
  const pathToEula = path.join(__dirname, '../minecraft/eula.txt');

  const data = await fs.readFileSync(
    pathToEula,
    ENCODING,
  );

  let approved;

  if (state) {
    approved = data.replace(
      /false/gim,
      'TRUE',
    );
  } else {
    approved = data.replace(
      /true/gim,
      'FALSE',
    );
  }

  await fs.writeFileSync(
    pathToEula,
    approved,
    ENCODING,
  );

  Monitor.log(
    CONSOLE_DEFAULT_PREFIX,
    EULA_APPROVED,
    Monitor.Layer.SUCCESS,
  );
};
