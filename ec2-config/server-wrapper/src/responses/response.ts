// Packages
import { ScriptServer } from "@scriptserver/core";
import { connection } from "websocket";

/**
 * Defines a response.
 */
export class ServerResponse {
  type: string;
  callback: Function

  constructor(
    type: string,
    callback: Function,
  ) {
    this.type = type;
    this.callback = callback;
  }

  /**
   * Whether a message matches this response type.
   *
   * @param {string} type Type from incoming message.
   * @returns Whether a message matches this response type.
   */
  isMatch(type: string): boolean {
    return this.type === type;
  }

  /**
   * Executes the callback with the given arguments.
   *
   * @param {string[]} args Arguments provided in message.
   * @returns Promise of callback functions.
   */
  async execute(
    mincraftServer: ScriptServer,
    socketConnection: connection,
    args: string[]): Promise<void> {
    return await this.callback(
      mincraftServer,
      socketConnection,
      ...args,
    );
  }
}