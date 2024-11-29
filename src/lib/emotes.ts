export interface TwitchEmote {
  id: string;
  start: number;
  end: number;
}

export function formatEmotes(message: string, emotes: TwitchEmote[]): string {
  if (!emotes || emotes.length === 0) {
    return message;
  }

  // Sort emotes by position to handle them in order
  const sortedEmotes = emotes.sort((a, b) => a.start - b.start);
  
  // Build message with emotes
  let result = '';
  let lastIndex = 0;

  for (const emote of sortedEmotes) {
    // Add text before emote
    result += message.substring(lastIndex, emote.start);
    
    // Add emote image
    result += `<img 
      class="emoticon inline-block align-middle" 
      src="https://static-cdn.jtvnw.net/emoticons/v1/${emote.id}/3.0" 
      alt="${message.substring(emote.start, emote.end + 1)}"
    >`;
    
    lastIndex = emote.end + 1;
  }

  // Add remaining text after last emote
  result += message.substring(lastIndex);

  return result;
}