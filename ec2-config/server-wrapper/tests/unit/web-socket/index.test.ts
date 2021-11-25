// Packages
import { server as WebSocketServer } from 'websocket';
import { Server as HttpServer } from 'http';

// Local Imports
import { generateWebSocketServer } from '../../../src/web-socket';

/**
 * A test suite for the web-socket generator.
 */
describe('Web Socket Generator', () => {
  let server: WebSocketServer;

  /**
   * Runs after each tests in test suite.
   */
  afterEach(async () => {
    // Stops the server.
    await server.closeAllConnections();
    await server.shutDown();
    // Clears mock counts.
    jest.clearAllMocks();
  });

  describe('generateWebSocketServer()', () => {
    it('should return a websocket server', async () => {
      server = await generateWebSocketServer();

      expect(server).toBeInstanceOf(WebSocketServer);
    });

    it('should override port', async () => {
      const consoleSpy = jest.spyOn(console, 'log');

      const newPort = 4000;
      server = await generateWebSocketServer(newPort);

      expect(consoleSpy.mock.calls[0][0].indexOf(`${newPort}`)).toBeGreaterThan(-1);
    });
  });
});
