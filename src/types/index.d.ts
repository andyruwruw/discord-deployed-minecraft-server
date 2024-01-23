
interface MinecraftPlayerEvent {
  /**
   * Player this event is about.
   */
  player: string;
}

interface MinecraftChatEvent extends MinecraftPlayerEvent {
  /**
   * Message sent.
   */
  message: string;
}

interface MinecraftLoginEvent extends MinecraftPlayerEvent {
  /**
   * Player's IP address.
   */
  ip: string;
}

interface MinecraftLogoutEvent extends MinecraftPlayerEvent {
  /**
   * Reason for logout.
   */
  reason: string;
}

interface MinecraftAchievementEvent extends MinecraftPlayerEvent {
  /**
   * Achievement gained.
   */
  achievement: string;
}
