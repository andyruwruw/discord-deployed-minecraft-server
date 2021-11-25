interface ServerConfig {
  overrideMinecraftServer?: any,
  overrideWebSocketServer?: any,
}

enum SocketState {
  OPEN = 'open',
  CLOSED = 'closed',
  PEER_REQUESTED_CLOSE = 'peer_requested_close',
  ENDING = 'ending',
};
