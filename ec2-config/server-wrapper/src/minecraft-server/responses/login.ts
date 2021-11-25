import { playerLogin } from '../helpers/active-players';

/**
 * Handles a minecraft login.
 * 
 * @param {LoginEvent} event The login event.
 */
export const handleLoginEvent = (event: LoginEvent) => {
  playerLogin(event.player);
};
