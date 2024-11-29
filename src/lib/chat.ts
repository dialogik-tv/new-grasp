import TwitchJs from 'twitch-js';
import type { Message } from './types';
import { GraspAnalyzer } from './grasp';
import { addMessage, updateUser, users } from './messageStore';
import { get } from 'svelte/store';
import { COMMON_BOTS } from './config';

export async function initializeChat(channel: string, grasp: GraspAnalyzer) {
  const { chat } = new TwitchJs({ channel });
  
  await chat.connect();
  await chat.join(channel);

  chat.on(TwitchJs.Chat.Events.ALL, (input: any) => handleMessage(input, grasp));
}

function handleMessage(input: any, grasp: GraspAnalyzer) {
  if (input.event !== 'PRIVMSG' || !input.message || !input.username) return;
  if (COMMON_BOTS.includes(input.username.toLowerCase())) return;

  const currentUsers = get(users);
  
  // Update user info
  const user = {
    userId: input.tags.userId,
    username: input.tags.displayName,
    badges: input.tags.badges,
    chatcount: (currentUsers[input.tags.userId]?.chatcount || 0) + 1
  };
  updateUser(user);

  // Create message
  const message: Message = {
    id: crypto.randomUUID(),
    username: input.tags.displayName,
    message: input.message,
    timestamp: new Date(input.timestamp),
    badges: input.tags.badges,
    emotes: input.tags.emotes || [],
    read: false,
    pick: false,
    grasp: grasp.analyze(input, user.chatcount)
  };

  addMessage(message);
}