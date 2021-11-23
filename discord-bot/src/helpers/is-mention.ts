// // Packages
// import { ClientUser, Message } from 'discord.js';

// // Local Imports
// import { CopperBot } from '../copper-bot';
// import { CommandList } from '../copper-bot/commands';

// export const isMention = (message: Message, client: CopperBot): boolean => {
//   // Prevents bot from checking other bots or itself.
//   if (message.author.bot) {
//     return false;
//   }

//   // Prevents bot from listening to universal mentions.
//   if (message.content.includes('@here') || message.content.includes('@everyone')) {
//     return false;
//   }

//   if (message.mentions.has((client.user as ClientUser).id)) {
//     for (let command of CommandList) {
//       if (command.isCommand(message)) {
//         return true;
//       }
//     }
//   }

//   return false;
// }
