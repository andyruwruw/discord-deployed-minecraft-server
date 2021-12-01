// Local Imports
import { CopperBot } from './copper-golem';
import {
  DISCORD_INTENTS,
  DISCORD_BOT_TOKEN,
} from './config';

// Crafting a new Copper Bot
const server = new CopperBot({
  intents: DISCORD_INTENTS,
});

// Logging him into Discord
server.login(DISCORD_BOT_TOKEN);
