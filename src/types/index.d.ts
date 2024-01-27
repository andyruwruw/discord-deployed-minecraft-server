export interface MinecraftPlayerEvent {
  /**
   * Player this event is about.
   */
  player: string;
}

export interface MinecraftChatEvent extends MinecraftPlayerEvent {
  /**
   * Message sent.
   */
  message: string;
}

export interface MinecraftLoginEvent extends MinecraftPlayerEvent {
  /**
   * Player's IP address.
   */
  ip: string;
}

export interface MinecraftLogoutEvent extends MinecraftPlayerEvent {
  /**
   * Reason for logout.
   */
  reason: string;
}

export interface MinecraftAchievementEvent extends MinecraftPlayerEvent {
  /**
   * Achievement gained.
   */
  achievement: string;
}
