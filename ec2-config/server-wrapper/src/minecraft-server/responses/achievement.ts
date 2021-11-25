import { PlayerEvent } from './index';

export interface AchievementEvent extends PlayerEvent {
  achievement: string;
};