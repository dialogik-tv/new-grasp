export class GraspAnalyzer {
  private channel: string;
  private langData: string[];

  constructor(channel: string, langData: string[]) {
    this.channel = channel;
    this.langData = langData;
  }

  analyze(input: any, chatcount: number) {
    const result = {
      mention: false,
      chatcount: false as number | false,
      haystack: false,
      shorty: false,
      mod: false,
      sub: false,
      vip: false,
      redemption: false
    };

    // Skip if message is directed to someone else
    if (
      input.message.startsWith('@') &&
      !input.message.toLowerCase().includes(`@${this.channel.toLowerCase()}`)
    ) {
      return result;
    }

    // Check for broadcaster mention
    if (input.message.toLowerCase().includes(`@${this.channel.toLowerCase()}`)) {
      result.mention = true;
    }

    // Check for new user (first two messages)
    if (chatcount < 3) {
      result.chatcount = chatcount;
    }

    // Check for short greetings
    if (this.searchShorties(input.message)) {
      result.shorty = true;
    }

    // Check for greeting phrases
    if (this.searchNeedles(input.message)) {
      result.haystack = true;
    }

    // Check badges
    result.mod = input.tags.mod === '1' || input.tags.badges?.moderator === '1';
    result.sub = input.tags.subscriber === '1' || input.tags.badges?.subscriber;
    result.vip = !!input.tags.badges?.vip;
    result.redemption = !!input.tags.customRewardId;

    return result;
  }

  private searchNeedles(haystack: string): boolean {
    const sanitized = this.removeDiacritics(haystack.toLowerCase())
      .replace(/[^a-z\s]/gi, '');

    return this.langData.some(needle => {
      const escapedNeedle = needle.toLowerCase()
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedNeedle}\\b`, 'g');
      return regex.test(sanitized);
    });
  }

  private searchShorties(message: string): boolean {
    const sanitized = this.removeDiacritics(message.toLowerCase())
      .replace(/[^a-z\s]/gi, '');
    return this.langData.includes(sanitized);
  }

  private removeDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}