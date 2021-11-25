// Local Imports
import { FindHome } from './findhome';
import { Ping } from './ping';
import { Pog } from './pog';
import { Register } from './register';
import { SetHome } from './sethome';
import { Stats } from './stats';
import { Unregister } from './unregister';

export { Command } from './command';

// List of all commands
export const CommandList = [
  new Ping(),
  new Pog(),
  new Register(),
  new Unregister(),
  new SetHome(),
  new FindHome(),
  new Stats(),
];
