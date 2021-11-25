// Packages
import {
  client as WebSocketClient,
  connection,
  server as WebSocketServer,
} from 'websocket';

// Local Imports
import { Server } from '../../src/server';
import { MockMinecraftServer } from '../utils/mock-minecraft-server';
import { WEBSOCKET_PORT } from '../../src/config/environment';

/**
 * A test suite for the server class.
 */
describe('Server Class', () => {
  let server: Server;

  /**
   * Runs before all tests in test suite.
   */
  beforeAll(async () => {
    // Creates a server with a mock minecraft server.
    server = new Server({
      overrideMinecraftServer: new MockMinecraftServer(),
    });
  });

  /**
   * Runs after all tests in test suite.
   */
  afterAll(async () => {
    // Stops the server.
    server.stop();
    // Clears mock counts.
    jest.clearAllMocks();
  });

  describe('Instantiation', () => {
    it('should instantiate internal servers', () => {
      expect(server.minecraftServer).toBeDefined();
      expect(server.minecraftServer).toBeInstanceOf(MockMinecraftServer);

      expect(server.websocket).toBeDefined();
      expect(server.websocket).toBeInstanceOf(WebSocketServer);
    });
  });

  describe('start()', () => {
    test('should start the minecraft server', () => {
      // Starts the server.
      server.start();

      // Checks the minecraft server state.
      expect((server.minecraftServer as MockMinecraftServer).start.mock.calls.length).toBe(1);
    });
  });

  describe('stop()', () => {
    test('should stop the minecraft server', () => {
      // Stops the server.
      server.stop();

      // Checks the minecraft server state.
      expect((server.minecraftServer as MockMinecraftServer).stop.mock.calls.length).toBe(1);
    });
  });

  // describe('handleRequest()', () => {
  //   test('should be called on attempted connection', async () => {
  //     // Creates a mock websocket client.
  //     const client = new WebSocketClient();
  //     client.connect(`ws://localhost:${WEBSOCKET_PORT}`);

  //     // Checks that connection was made.
  //     expect(server.socketConnection).toBeDefined();
  //     expect(server.socketConnection).toBeInstanceOf(connection);
  //   });
  // });
});