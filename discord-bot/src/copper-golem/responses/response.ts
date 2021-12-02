import { Component } from './components/component';
import { Embed } from './components';

export class DiscordResponse {
  content: string;

  embeds: Array<Embed>;

  components: Array<Component>;

  constructor(
    content: string,
    embeds: Array<Embed> = [],
    components: Array<Component> = [],
  ) {
    this.content = content;
    this.embeds = embeds;
    this.components = components;
  }
  
  /**
   * Generates the object for the Discord response.
   *
   * @returns {object} Discord accepted object as message.
   */
  build() {
    return {
      content: this.content,
      tts: false,
      embeds: this.embeds.map(embed => embed.build()),
      allowedMentions: {},
      messageReference: null,
      components: this.components,
      files: [],
      payloadJson: '',
      attatchments: [],
    };
  }
}
