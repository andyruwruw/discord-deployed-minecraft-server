export class DiscordResponse {
  constructor() {
    
  }
  
  /**
   * Generates the object for the Discord response.
   *
   * @returns {object} Discord accepted object as message.
   */
  build() {
    return {
      content: null,
      tts: false,
      embeds: [],
      allowedMentions: {},
      messageReference: null,
      components: [],
      files: [],
      payloadJson: '',
      attatchments: [],
    };
  }
}
