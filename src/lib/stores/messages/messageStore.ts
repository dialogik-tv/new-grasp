import { writable, derived } from 'svelte/store';
import type { Message } from '../../types';
import type { FilterSettings } from '../filterStore';
import { MessageBuffer } from './messageBuffer';
import { MessageCache } from './messageCache';

const buffer = new MessageBuffer();
const cache = new MessageCache();

function createMessageStore() {
  const { subscribe, set } = writable<Message[]>([]);

  return {
    subscribe,
    add: (message: Message) => {
      buffer.add(message);
      const messages = buffer.getMessages();
      set(messages);
      cache.clear(); // Invalidate cache when new message arrives
    },
    getFiltered: (filters: FilterSettings): Message[] => {
      const cacheKey = cache.generateCacheKey(filters);
      const cached = cache.getCached(cacheKey);
      
      if (cached) {
        return cached;
      }

      const messages = buffer.getMessages();
      const filtered = filterMessages(messages, filters);
      cache.setCached(cacheKey, filtered);
      return filtered;
    },
    getMessagesByUsername: (username: string): Message[] => {
      return buffer.getMessagesByUsername(username);
    },
    clear: () => {
      buffer.clear();
      cache.clear();
      set([]);
    }
  };
}

function filterMessages(messages: Message[], filters: FilterSettings): Message[] {
  return messages.filter(msg => {
    // Apply username filter if present
    if (filters.username && !msg.username.toLowerCase().includes(filters.username.toLowerCase())) {
      return false;
    }

    // Check if message matches any active filter
    return (
      (filters.mention && msg.grasp.mention) ||
      (filters.chatcount && msg.grasp.chatcount !== false) ||
      (filters.mod && msg.grasp.mod) ||
      (filters.sub && msg.grasp.sub) ||
      (filters.vip && msg.grasp.vip) ||
      (filters.haystack && msg.grasp.haystack) ||
      (filters.shorty && msg.grasp.shorty)
    );
  });
}

export const messages = createMessageStore();

// Derived store for recent messages with memoization
export const recentMessages = derived(
  messages,
  $messages => $messages.slice(0, 100)
);