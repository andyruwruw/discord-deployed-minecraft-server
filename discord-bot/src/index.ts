// Packages
import dotenv from 'dotenv';

// Local Imports
import { CopperBot } from './copper-bot';
import { DISCORD_INTENTS } from './config';

dotenv.config();

// Retreive secrets from .env file
const {
  DISCORD_BOT_TOKEN,
} = process.env;

// Crafting a new Copper Bot
const server = new CopperBot({
  intents: DISCORD_INTENTS,
});

// Logging him into Discord
server.login(DISCORD_BOT_TOKEN);
