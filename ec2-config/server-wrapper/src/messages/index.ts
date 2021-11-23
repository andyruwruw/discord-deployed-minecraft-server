// Local Imports
import { CopperBotResponse } from './response';
import { Command } from './command';
import { Status } from './status';
import { PlayerPosition } from './player-position';

/**
 * List of messages that can be sent to the server.
 */
export const Messages = () => {
  const messages: Record<string,CopperBotResponse> = {};

  messages[Command.type] = Command;
  messages[Status.type] = Status;
  messages[PlayerPosition.type] = PlayerPosition;

  return messages;
}

export default CopperBotResponse;
