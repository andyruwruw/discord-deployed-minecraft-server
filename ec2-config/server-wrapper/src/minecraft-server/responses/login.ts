import { playerLogin } from '../helpers/active-players';
import { PlayerEvent } from './index';

export interface LoginEvent extends PlayerEvent {
  ip: string;
};

/**
 * Handles a minecraft login.
 * 
 * @param {LoginEvent} event The login event.
 */
export const handleLoginEvent = (event: LoginEvent) => {
  playerLogin(event.player);
};
