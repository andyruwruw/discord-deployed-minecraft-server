interface ServerConfig {
  overrideMinecraftServer?: any,
  overrideWebSocketServer?: any,
}

interface PlayerEvent {
  player: string;
}

interface LoginEvent extends PlayerEvent {
  ip: string;
}

interface LogoutEvent extends PlayerEvent {
  reason: string;
}

interface ChatEvent extends PlayerEvent {
  message: string;
}

enum SocketState {
  OPEN = 'open',
  CLOSED = 'closed',
  PEER_REQUESTED_CLOSE = 'peer_requested_close',
  ENDING = 'ending',
};
