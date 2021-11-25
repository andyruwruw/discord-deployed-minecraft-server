export { handleLoginEvent, LoginEvent } from './login';
export { LogoutEvent } from './logout';
export { AchievementEvent } from './achievement';
export { ChatEvent } from './chat';

export interface PlayerEvent {
  player: string;
};
