// Packages
import { client as WebSocketClient } from 'websocket';

import { generateWebSocketClient } from '../../../src/web-socket';

/**
 * A test suite for the web-socket generator.
 */
describe('Web Socket Generator', () => {
  let client: WebSocketClient;

  /**
   * Runs after each tests in test suite.
   */
  afterEach(async () => {
    // Clears mock counts.
    jest.clearAllMocks();
  });

  describe('generateWebSocketClient()', () => {
    it('should return a websocket client', async () => {
      const port = 4000;
      client = await generateWebSocketClient(port);

      expect(client).toBeInstanceOf(WebSocketClient);
    });
  });
});