// Packages
import { server as WebSocketServer } from 'websocket';

// Local Imports
import { generateWebSocketServer } from '../../../src/web-socket';

/**
 * A test suite for the web-socket generator.
 */
describe('Web Socket Generator', () => {
  let consoleSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  let server: WebSocketServer;

  /**
   * Run before all tests in test suite.
   */
  beforeAll(async () => {
    consoleSpy = jest.spyOn(console, 'log');
  });

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
      const newPort = 4000;
      server = await generateWebSocketServer(newPort);

      expect(consoleSpy.mock.calls[0][0].indexOf(`${newPort}`)).toBeGreaterThan(-1);
    });

    it('should return a listening server', async () => {
      const newPort = 4001;
      server = await generateWebSocketServer(newPort);

      expect(consoleSpy.mock.calls[0][0].indexOf(`Websocket server listening on port `)).toBeGreaterThan(-1);
    });
  });
});
