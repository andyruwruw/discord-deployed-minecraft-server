// Local Imports
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

/**
 * Handles Discord bot errors.
 */
export class DiscordErrorHandler extends Handler<Error> {
  /**
   * Handles the event.
   * 
   * @param {Error} payload Event payload.
   */
  async execute(payload: Error): Promise<void> {
    try {
      console.log(payload);
    } catch (error) {
      await Monitor.trace(
        DiscordErrorHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
