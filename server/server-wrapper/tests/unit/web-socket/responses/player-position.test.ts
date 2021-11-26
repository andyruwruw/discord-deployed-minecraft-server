// Packages
import { Location as ScriptServerLocation } from '@scriptserver/util';

// Local Imports
import {
  PlayerPosition,
  TYPE,
} from '../../../../src/web-socket/responses/player-position';
import {
  MockMinecraftServer,
  MockRconConnection,
} from '../../../utils/mock-minecraft-server';
import { MockConnection } from '../../../utils/mock-web-socket-server';

const PLAYER_NAME = 'andyruwruw';

const LOCATION_DATA: ScriptServerLocation = {
  x: 0,
  y: 0,
  z: 0,
  dimension: 'minecraft:overworld',
};

/**
 * A test suite for the web-socket generator.
 */
describe('Player Position Event', () => {
  let mockServer: MockMinecraftServer;

  let mockConnection: MockConnection;

  /**
   * Runs before all tests in test suite.
   */
  beforeAll(async () => {
    mockServer = new MockMinecraftServer();
    mockConnection = new MockConnection();
  });

  /**
   * Runs after each tests in test suite.
   */
  afterEach(async () => {
    // Clears mock counts.
    jest.clearAllMocks();
  });

  it('should have the correct response type', async () => {
    expect(PlayerPosition.type).toBe(TYPE);
  });

  it('should have a callback function', async () => {
    expect(typeof(PlayerPosition.callback)).toBe('function');
  });

  describe('isMatch()', () => {
    it('should return true for valid type', async () => {
      expect(PlayerPosition.isMatch(TYPE)).toBe(true);
    });

    it('should return false for invalid type', async () => {
      expect(PlayerPosition.isMatch('invalid')).toBe(false);
    });
  });

  describe('execute()', () => {
    it('should check with java server if player is online', async () => {
      (mockServer.rconConnection as MockRconConnection).util.isOnline.mockReturnValueOnce(false);
  
      PlayerPosition.execute(mockServer, mockConnection, [ PLAYER_NAME ]);

      expect(mockServer.rconConnection.util.isOnline).toHaveBeenCalledWith(PLAYER_NAME);
    });

    it('should request position from java server', async () => {
      (mockServer.rconConnection as MockRconConnection).util.isOnline.mockReturnValueOnce(true);
      (mockServer.rconConnection as MockRconConnection).util.getLocation.mockReturnValueOnce(LOCATION_DATA);

      await PlayerPosition.execute(mockServer, mockConnection, [ PLAYER_NAME ]);

      expect((mockServer.rconConnection as MockRconConnection).util.getLocation).toHaveBeenCalledWith(PLAYER_NAME);
    });

    it('should send location back to socket if player online', async () => {
      (mockServer.rconConnection as MockRconConnection).util.isOnline.mockReturnValueOnce(true);
      (mockServer.rconConnection as MockRconConnection).util.getLocation.mockReturnValueOnce(LOCATION_DATA);

      await PlayerPosition.execute(mockServer, mockConnection, [ PLAYER_NAME ]);

      expect(mockConnection.send).toHaveBeenCalledWith(JSON.stringify({
        type: TYPE,
        username: PLAYER_NAME,
        online: true,
        location: LOCATION_DATA,
      }));
    });

    it('should send not online back to socket if player not online', async () => {
      (mockServer.rconConnection as MockRconConnection).util.isOnline.mockReturnValueOnce(false);

      await PlayerPosition.execute(mockServer, mockConnection, [ PLAYER_NAME ]);

      expect(mockConnection.send).toHaveBeenCalledWith(JSON.stringify({
        type: TYPE,
        username: PLAYER_NAME,
        online: false,
        location: null,
      }));
    });
  });
});
