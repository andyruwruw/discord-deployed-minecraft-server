// Local Imports
import {
  Command,
  TYPE,
} from '../../../../src/web-socket/responses/command';
import { MockMinecraftServer } from '../../../utils/mock-minecraft-server';
import { MockConnection } from '../../../utils/mock-web-socket-server';

/**
 * A test suite for the web-socket generator.
 */
describe('Command Event', () => {
  /**
   * Runs after each tests in test suite.
   */
  afterEach(async () => {
    // Clears mock counts.
    jest.clearAllMocks();
  });

  it('should have the correct response type', async () => {
    expect(Command.type).toBe(TYPE);
  });

  it('should have a callback function', async () => {
    expect(typeof(Command.callback)).toBe('function');
  });

  describe('isMatch()', () => {
    it('should return true for valid type', async () => {
      expect(Command.isMatch(TYPE)).toBe(true);
    });

    it('should return false for invalid type', async () => {
      expect(Command.isMatch('invalid')).toBe(false);
    });
  });

  describe('execute()', () => {
    it('should send command to java server', async () => {
      const COMMAND = 'say hello';
      const mockServer = new MockMinecraftServer();

      Command.execute(mockServer, new MockConnection(), [ COMMAND ]);

      expect(mockServer.javaServer.send).toHaveBeenCalledWith(COMMAND);
    });
  });
});
