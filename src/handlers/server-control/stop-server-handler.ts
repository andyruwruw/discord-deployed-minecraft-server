// Local Imports
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

// Types
import { MinecraftLoginEvent } from '../../types/minecraft';

/**
 * Handles a scheduled restart.
 */
export class StopServerHandler extends Handler<MinecraftLoginEvent> {
  /**
   * Handles the event.
   * 
   * @param {MinecraftLoginEvent} payload Event payload.
   */
  async execute(payload: MinecraftLoginEvent): Promise<void> {
    try {
    } catch (error) {
      await Monitor.trace(
        StopServerHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
