// Local Imports
import { WebSocketReponse } from '../response'; 
import { ResponseList } from '../index';
  
/**
 * Retrieves a response by name.
 *
 * @param {string} name Response name. 
 * @returns {WebSocketReponse | null} Response object or null if not found.
 */
export const getResponse = (name: string): WebSocketReponse | null => {
    const index = ResponseList.findIndex(response => response.name === name);
  
    if (index === -1) {
        return null;
    }
  
    return ResponseList[index];
};
  