// Packages
import {
  ApplicationCommandOptionData,
  CommandInteraction,
} from 'discord.js';

// Local Imports
import { DiscordReferences } from '../../discord-references';
import { DISCORD_ROLE } from '../../../config/discord';
import { ChatCommand } from '../generic/chat-command';
import { Monitor } from '../../../helpers/monitor';
import { Server } from '../../..';
import WhitelistUsernameParameter from './options/whitelist-username';


/**
 * Commands for assigning discord.
 */
export class WhitelistCommand extends ChatCommand {
  /**
   * The Command's key.
   */
  static key: string = 'whitelist';

  /**
   * Executes the command.
   *
   * @param {CommandInteraction} interaction Interaction to execute the command on.
   */
  async execute(interaction: CommandInteraction): Promise<void> {
    let replied = false;

    try {
      const username = interaction.options.data[0];

      await interaction.reply({
        content: `☐ - Registering \`${username.value}\`...`,
      });
      replied = true;

      const user = interaction.member?.user.id;

      if (!user || !username.value) {
        throw new Error('All required parameters not provided.');
      }

      await Server.Minecraft.runCommand(`whitelist add ${username.value}`);

      const existing = await Server.Database.players.findOne({
        discord: user,
        minecraft: username.value as string,
      });

      if (!existing) {
        await Server.Database.players.insert({
          discord: user,
          minecraft: username.value as string,
          achievements: 0,
          achievementUpdate: 0,
          deaths: 0,
          deathUpdate: 0,
          logins: 0,
          hoursUpdate: 0,
          hours: 0,
        });

        const dirt = await DiscordReferences.getRole(DISCORD_ROLE.DIRT);
        const member = await DiscordReferences.getPlayer(user);

        if (!existing
          && dirt
          && member) {
          await member?.roles.add(dirt.id);
        }
      }

      await interaction.editReply({
        content: `☑ - \`${username.value}\` has been added!`,
      });
    } catch (error) {
      await Monitor.log(
        WhitelistCommand,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      const response = '☒ - Issue Registering User.';

      try {
        if (replied) {
          interaction.editReply({
            content: response,
          });
        } else {
          interaction.reply({
            content: response,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  /**
   * Retrieves the description of the command.
   *
   * @returns {string} Description of the command.
   */
  getDescription(): string {
    return 'Whitelist your account!.';
  }

  /**
   * Retrieves the Command's key.
   *
   * @returns {string} Key of the Command.
   */
  getKey(): string {
    return WhitelistCommand.key;
  }

  /**
   * Retrieves a Command's options.
   *
   * @returns {ApplicationCommandOptionData[]} Options of the Command.
   */
  getOptions(): ApplicationCommandOptionData[] {
    return [
      WhitelistUsernameParameter.create(),
    ] as ApplicationCommandOptionData[];
  }
}
