// Local Imports
import { ServerResponse } from './response';
import { Command } from './command';
import { Status } from './status';
import { PlayerPosition } from './player-position';

/**
 * List of responses that can be sent to the server.
 */
export const Responses = () => {
  const responses: Record<string,ServerResponse> = {};

  responses[Command.type] = Command;
  responses[Status.type] = Status;
  responses[PlayerPosition.type] = PlayerPosition;

  return responses;
}

export default ServerResponse;
