// Local Imports
import { Handler } from '../handler';
import { Monitor } from '../../helpers/monitor';

/**
 * Handles the assignment of a Discord user.
 */
export class AssignUserHandler extends Handler<string> {
  /**
   * Handles the event.
   * 
   * @param {string} payload Event payload.
   */
  async execute(payload: string): Promise<void> {
    try {
    } catch (error) {
      await Monitor.trace(
        AssignUserHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
