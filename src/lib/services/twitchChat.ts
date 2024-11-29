import TwitchJs from 'twitch-js';
import type { Message } from '../types';
import { GraspAnalyzer } from '../grasp';
import { addMessage } from '../stores/messageStore';
import { COMMON_BOTS } from '../config';

export async function initializeTwitchChat(channel: string, grasp: GraspAnalyzer) {
  const { chat } = new TwitchJs({ channel });
  
  await chat.connect();
  await chat.join(channel);

  chat.on(TwitchJs.Chat.Events.ALL, (input: any) => {
    if (input.event !== 'PRIVMSG' || !input.message || !input.username) return;
    if (COMMON_BOTS.includes(input.username.toLowerCase())) return;

    const message: Message = {
      id: crypto.randomUUID(),
      username: input.tags.displayName,
      message: input.message,
      timestamp: new Date(input.timestamp),
      badges: input.tags.badges || {},
      emotes: input.tags.emotes || [],
      read: false,
      pick: false,
      grasp: grasp.analyze(input, 1) // Initial message count
    };

    addMessage(message);
  });

  return chat;
}