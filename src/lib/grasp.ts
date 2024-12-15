export class GraspAnalyzer {
  private channel: string;
  private langData: string[];

  constructor(channel: string, langData: string[]) {
    this.channel = channel.toLowerCase();
    this.langData = langData;
  }

  analyze(input: any) {
    const messageCount = input.tags?.messageCount || 1;
    
    const result = {
      mention: false,
      chatcount: messageCount <= 2 ? messageCount : false,
      haystack: false,
      shorty: false,
      mod: false,
      sub: false,
      vip: false,
      redemption: false
    };

    // Check for broadcaster mention
    if (input.message.toLowerCase().includes(`@${this.channel}`)) {
      result.mention = true;
    }

    // Check for short greetings (exact match)
    const sanitizedMessage = this.removeDiacritics(input.message.toLowerCase())
      .replace(/[^a-z\s]/gi, '')
      .trim();
    result.shorty = this.langData.includes(sanitizedMessage);

    // Check for greeting phrases (partial match)
    result.haystack = this.searchNeedles(input.message);

    // Check badges - ensure exclusive roles
    const badges = input.tags.badges || {};
    result.mod = input.tags.mod === '1' || !!badges.moderator;
    result.sub = !result.mod && (input.tags.subscriber === '1' || !!badges.subscriber);
    result.vip = !result.mod && !result.sub && !!badges.vip;
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

  private removeDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}