export class DiscordResponse {
  
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
