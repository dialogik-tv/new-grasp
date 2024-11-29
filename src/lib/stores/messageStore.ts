import { writable, derived } from 'svelte/store';
import type { Message, User } from '../types';
import { filterMessages } from '../utils/messageFilters';

// User message count store
const userMessageCounts = writable<Record<string, number>>({});

// Message store with fixed size circular buffer
const MAX_MESSAGES = 1000;
const PRUNE_THRESHOLD = 800;

function createMessageStore() {
  const { subscribe, update } = writable<Message[]>([]);

  return {
    subscribe,
    add: (message: Message) => {
      // Update user message count
      userMessageCounts.update(counts => {
        const currentCount = (counts[message.username.toLowerCase()] || 0) + 1;
        return {
          ...counts,
          [message.username.toLowerCase()]: currentCount
        };
      });

      update(messages => {
        const newMessages = [message, ...messages];
        
        // Prune messages when we hit the threshold
        if (newMessages.length > MAX_MESSAGES) {
          return newMessages.slice(0, PRUNE_THRESHOLD);
        }
        
        return newMessages;
      });
    },
    toggleRead: (messageId: string) => {
      update(messages => 
        messages.map(msg => 
          msg.id === messageId ? { ...msg, read: !msg.read } : msg
        )
      );
    },
    togglePick: (messageId: string) => {
      update(messages => 
        messages.map(msg => 
          msg.id === messageId ? { ...msg, pick: !msg.pick } : msg
        )
      );
    }
  };
}

export const messages = createMessageStore();

// Create derived stores with memoization
export const chatMessages = derived(
  messages,
  $messages => $messages.slice(0, 100)
);

// Export user message counts for use in other components
export const getUserMessageCount = (username: string): number => {
  let count = 0;
  userMessageCounts.subscribe(counts => {
    count = counts[username.toLowerCase()] || 0;
  })();
  return count;
};