import TwitchJs from 'twitch-js';
import type { Message } from '../types';
import { GraspAnalyzer } from '../grasp';
import { addMessage } from '../stores/messageStore';
import { updateUser } from '../stores/userStore';
import { COMMON_BOTS } from '../config';

export async function initializeTwitchChat(channel: string, grasp: GraspAnalyzer) {
  const client = new TwitchJs({ channel });
  
  try {
    const { chat } = client;
    await chat.connect();
    await chat.join(channel);

    chat.on('PRIVMSG', msg => {
      if (!msg.message || !msg.username) return;
      if (COMMON_BOTS.includes(msg.username.toLowerCase())) return;

      // Update user info
      const user = {
        userId: msg.tags.userId,
        username: msg.tags.displayName || msg.username,
        badges: msg.tags.badges || {},
        chatcount: 1
      };
      updateUser(user);

      // Create message
      const message: Message = {
        id: crypto.randomUUID(),
        username: user.username,
        message: msg.message,
        timestamp: new Date(),
        badges: msg.tags.badges || {},
        emotes: msg.tags.emotes || [],
        read: false,
        pick: false,
        grasp: grasp.analyze(msg, user.chatcount)
      };

      addMessage(message);
    });

    return chat;
  } catch (error) {
    console.error('Failed to connect to Twitch chat:', error);
    throw error;
  }
}