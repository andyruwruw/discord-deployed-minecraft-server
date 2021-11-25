// Local Imports
// import { Wakeup } from './wakeup';
// import { Bedtime } from './bedtime';
import { Ping } from './ping';
import { Pog } from './pog';

export { Command } from './command';

// List of all commands
export const CommandList = [
  // Wakeup,
  // Bedtime,
  new Ping(),
  new Pog()
];
