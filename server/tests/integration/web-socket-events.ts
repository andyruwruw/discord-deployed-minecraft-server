// // Packages
// import { json } from 'body-parser';
// import WebSocket from 'ws';

// // Local Imports
// import { Server } from '../../src/server';
// import { MockJavaServer, MockMinecraftServer } from '../utils/mock-minecraft-server';
// import {
//   generateWebSocketClient,
//   waitForSocketState,
//   waitForServerState,
// } from '../utils/mock-websocket-client';

// const PORT = 3001;

// /**
//  * A test suite for websocket events.
//  */
// describe('Websocket Integration Tests', () => {
//   let server: Server;

//   /**
//    * Runs before all tests in test suite.
//    */
//   beforeAll(async () => {
//     // Creates a server with a mock minecraft server.
//     server = new Server({
//       minecraftServer: new MockMinecraftServer(),
//       webSocketPort: PORT,
//     });
//     await waitForServerState(server);
//   });

//   /**
//    * Runs after all tests in test suite.
//    */
//   afterAll(async () => {
//     // Stops the server.
//     server.stop();
//     // Clears mock counts.
//     jest.clearAllMocks();
//   });

//   describe('handleRequest()', () => {
//     test('should save socket connection', async () => {
//       const client = generateWebSocketClient(PORT);
//       await waitForSocketState(client, WebSocket.OPEN);

//       await client.send(JSON.stringify({
//         type: 'command',
//         args: ['say hello'],
//       }));

//       // Checks that connection was made.
//       expect((server.minecraftServer.javaServer as MockJavaServer).send.mock.calls.length).toBe(0);

//       client.close();
//     });
//   });
// });
