/**
 * Instantiates different handlers and exports them.
 */

// Assignment Handlers
import { AssignChannelHandler as AssignChannelHandlerClass } from './assignments/assign-channel-handler';
import { AssignRoleHandler as AssignRoleHandlerClass } from './assignments/assign-role-handler';
import { AssignUserHandler as AssignUserHandlerClass } from './assignments/assign-user-handler';

export const AssignChannelHandler = new AssignChannelHandlerClass();
export const AssignRoleHandler = new AssignRoleHandlerClass();
export const AssignUserHandler = new AssignUserHandlerClass();

// Discord Handlers
import { DiscordErrorHandler as DiscordErrorHandlerClass } from './discord/discord-error-handler';
import { DiscordInteractionHandler as DiscordInteractionHandlerClass } from './discord/discord-interaction-handler';
import { DiscordMessageCreateHandler as DiscordMessageCreateHandlerClass } from './discord/discord-message-create-handler';
import { DiscordReadyHandler as DiscordReadyHandlerClass } from './discord/discord-ready-handler';

export const DiscordErrorHandler = new DiscordErrorHandlerClass();
export const DiscordInteractionHandler = new DiscordInteractionHandlerClass();
export const DiscordMessageCreateHandler = new DiscordMessageCreateHandlerClass();
export const DiscordReadyHandler = new DiscordReadyHandlerClass();

// Minecraft Handlers
import { EulaErrorHandler as EulaErrorHandlerClass } from './minecraft/eula-error-handler';
import { MinecraftConsoleHandler as MinecraftConsoleHandlerClass } from './minecraft/minecraft-console-handler';
import { PlayerAchievementHandler as PlayerAchievementHandlerClass } from './minecraft/player-achievement-handler';
import { PlayerDeathHandler as PlayerDeathHandlerClass } from './minecraft/player-death-handler';
import { PlayerLoginHandler as PlayerLoginHandlerClass } from './minecraft/player-login-handler';
import { PlayerLogoutHandler as PlayerLogoutHandlerClass } from './minecraft/player-logout-handler';
import { ServerStartHandler as ServerStartHandlerClass } from './minecraft/server-start-handler';

export const EulaErrorHandler = new EulaErrorHandlerClass();
export const MinecraftConsoleHandler = new MinecraftConsoleHandlerClass();
export const PlayerAchievementHandler = new PlayerAchievementHandlerClass();
export const PlayerDeathHandler = new PlayerDeathHandlerClass();
export const PlayerLoginHandler = new PlayerLoginHandlerClass();
export const PlayerLogoutHandler = new PlayerLogoutHandlerClass();
export const ServerStartHandler = new ServerStartHandlerClass();

// Server Control Handlers
import { ChangeServerSettingsHandler as ChangeServerSettingsHandlerClass } from './server-control/change-server-settings-handler';
import { DeleteWorldHandler as DeleteWorldHandlerClass } from './server-control/delete-world-handler';
import { ScheduleRestartHandler as ScheduleRestartHandlerClass } from './server-control/schedule-restart-handler';
import { StartServerHandler as StartServerHandlerClass } from './server-control/start-server-handler';
import { StopServerHandler as StopServerHandlerClass } from './server-control/stop-server-handler';

export const ChangeServerSettingsHandler = new ChangeServerSettingsHandlerClass();
export const DeleteWorldHandler = new DeleteWorldHandlerClass();
export const ScheduleRestartHandler = new ScheduleRestartHandlerClass();
export const StartServerHandler = new StartServerHandlerClass();
export const StopServerHandler = new StopServerHandlerClass();
