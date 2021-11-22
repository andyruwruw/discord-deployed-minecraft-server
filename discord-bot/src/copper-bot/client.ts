// Packages
import {
  Client,
  ClientOptions,
  Message,
} from 'discord.js';

// Local Imports
import { READY_RESPONSE_STRING } from '../config';

// Our little buddy
export class CopperBot extends Client {
  constructor(options: ClientOptions) {
    super(options);

    this.on('ready', this.handleConnect);
    this.on('message', this.handleMessage);
  }

  handleConnect() {
    console.log(READY_RESPONSE_STRING);
  }

  handleMessage(message: Message) {
  }
}
