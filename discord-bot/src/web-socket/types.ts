import { ContextObject } from '../copper-golem/context';

export interface WebSocketMessageData {
    type: string;
    context: ContextObject;
}

export interface WebSocketPlayerData extends WebSocketMessageData {
    player: string;
}

export interface WebSocketAchievementMessage extends WebSocketPlayerData {
    type: 'achievement';
    achievement: string;
}

export interface WebSocketChatMessage extends WebSocketPlayerData {
    type: 'chat';
    message: string;
}

export interface WebSocketLoginMessage extends WebSocketPlayerData {
    type: 'login';
}

export interface WebSocketLogoutMessage extends WebSocketPlayerData {
    type: 'logout';
    reason: string;
    timeSpent: number;
    start: number;
}

export interface WebSocketLocation {
    x: number;
    y: number;
    z: number;
    dimention: string;
}

export interface WebSocketPlayerPositionMessage extends WebSocketPlayerData {
    type: 'player-position';
    online: boolean;
    location: null | WebSocketLocation;
}
