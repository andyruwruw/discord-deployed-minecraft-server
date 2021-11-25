import { PlayerEvent } from './index';

export interface ChatEvent extends PlayerEvent {
  message: string;
};
