import { PlayerEvent } from './index';

export interface LogoutEvent extends PlayerEvent {
  reason: string;
};
