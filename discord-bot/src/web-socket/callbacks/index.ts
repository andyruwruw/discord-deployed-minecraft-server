// Local Imports
import { WebSocketCallback } from './callback';
import { CreateHomeResolution } from './create-home-resolution';
import { AchievementResponse } from './achievement';

export const CallbackList: Array<WebSocketCallback> = [
    CreateHomeResolution,
    AchievementResponse,
];
