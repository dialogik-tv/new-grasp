import TwitchJs from 'twitch-js';
import type { Message } from '../types';
import { GraspAnalyzer } from '../grasp';
import { messages } from '../stores/messages/messageStore';
import { updateUser } from '../stores/userStore';
import { COMMON_BOTS } from '../config';

const RECONNECT_INTERVAL = 5000;
const MAX_RECONNECT_ATTEMPTS = 5;

export async function initializeTwitchChat(channel: string, grasp: GraspAnalyzer) {
  let reconnectAttempts = 0;
  let client: TwitchJs;

  async function connect() {
    try {
      client = new TwitchJs({ channel });
      const { chat } = client;
      
      await chat.connect();
      await chat.join(channel);
      reconnectAttempts = 0;

      chat.on('PRIVMSG', handleMessage);
      chat.on('DISCONNECTED', handleDisconnect);
      
      return chat;
    } catch (error) {
      console.error('Failed to connect to Twitch chat:', error);
      handleDisconnect();
      throw error;
    }
  }

  function handleMessage(msg: any) {
    if (!msg.message || !msg.username) return;
    if (COMMON_BOTS.includes(msg.username.toLowerCase())) return;

    try {
      // Create message
      const message: Message = {
        id: crypto.randomUUID(),
        username: msg.tags.displayName || msg.username,
        message: msg.message,
        timestamp: new Date(),
        badges: msg.tags.badges || {},
        emotes: msg.tags.emotes || [],
        read: false,
        pick: false,
        grasp: grasp.analyze(msg)
      };

      messages.add(message);

      // Update user info
      updateUser({
        userId: msg.tags.userId,
        username: message.username,
        badges: message.badges,
        chatcount: 1 // The store will increment this
      });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  }

  async function handleDisconnect() {
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached');
      return;
    }

    reconnectAttempts++;
    console.log(`Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
    
    setTimeout(async () => {
      try {
        await connect();
      } catch (error) {
        handleDisconnect();
      }
    }, RECONNECT_INTERVAL);
  }

  return connect();
}