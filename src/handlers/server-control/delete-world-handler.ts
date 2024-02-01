// Local Imports
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

// Types
import { MinecraftLoginEvent } from '../../types/minecraft';

/**
 * Handles a scheduled restart.
 */
export class DeleteWorldHandler extends Handler<MinecraftLoginEvent> {
  /**
   * Handles the event.
   * 
   * @param {MinecraftLoginEvent} payload Event payload.
   */
  async execute(payload: MinecraftLoginEvent): Promise<void> {
    try {
    } catch (error) {
      await Monitor.trace(
        DeleteWorldHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
