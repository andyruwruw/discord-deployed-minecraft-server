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
