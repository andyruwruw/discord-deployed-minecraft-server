// Local Imports
import { WebSocketCallback } from '../callback'; 
import { CallbackList } from '../index';
  
/**
 * Retrieves a callback by name.
 *
 * @param {string} name Callback name. 
 * @returns {WebSocketCallback | null} Callback object or null if not found.
 */
export const getCallback = (name: string): WebSocketCallback | null => {
    const index = CallbackList.findIndex(response => response.name === name);
  
    if (index === -1) {
        return null;
    }
  
    return CallbackList[index];
};
  