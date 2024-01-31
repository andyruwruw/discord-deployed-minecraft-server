// Packages
import fs from 'fs';
import path from 'path';

// Local Imports
import { editServerProperties } from '../../utils/edit-server-properties';
import { EULA_APPROVED } from '../../config/messages';
import { ENCODING } from '../../config/minecraft';
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

/**
 * Handles the EULA error.
 */
export class EulaErrorHandler extends Handler<string> {
  /**
   * Handles the event.
   * 
   * @param {string} payload Event payload.
   */
  async execute(payload: string): Promise<void> {
    try {
      await Handler.Minecraft.stop();

      await Promise.all([
        this._approveEula(),
        editServerProperties(true),
      ]);

      await Handler.Minecraft.start();
    } catch (error) {
      await Monitor.trace(
        EulaErrorHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Approves EULA.
   */
  async _approveEula(): Promise<void> {
    try {
      // Get the path to EULA.
      const pathToEula = path.join(
        __dirname,
        '../../minecraft/eula.txt',
      );

      // Read and approve.
      const data = (await fs.readFileSync(
        pathToEula,
        ENCODING,
      )).replace(
        /false/gim,
        'TRUE',
      );

      // Replace contents of EULA.
      await fs.writeFileSync(
        pathToEula,
        data,
        ENCODING,
      );
    
      // Inform.
      Monitor.log(
        EulaErrorHandler,
        EULA_APPROVED,
        Monitor.Layer.SUCCESS,
      );
    } catch (error) {
      await Monitor.trace(
        EulaErrorHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
