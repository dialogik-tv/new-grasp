import { writable, derived } from 'svelte/store';
import type { Message } from '../types';
import { filterMessages } from '../utils/messageFilters';
import { get } from 'svelte/store';
import { filterSettings } from './filterStore';

// Create the main message store with a fixed size circular buffer
const MAX_MESSAGES = 1000;
const PRUNE_THRESHOLD = 800;

function createMessageStore() {
  const { subscribe, update } = writable<Message[]>([]);

  return {
    subscribe,
    add: (message: Message) => {
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
  [messages, filterSettings],
  ([$messages, $filters]) => {
    const filtered = $messages.slice(0, 100);
    return $filters.username ? 
      filtered.filter(msg => 
        msg.username.toLowerCase().includes($filters.username.toLowerCase())
      ) : filtered;
  }
);

export const graspMessages = derived(
  [messages, filterSettings],
  ([$messages, $filters]) => filterMessages($messages, $filters)
);

export const pickedMessages = derived(
  [messages, filterSettings],
  ([$messages, $filters]) => {
    const picked = $messages.filter(msg => msg.pick);
    return $filters.username ?
      picked.filter(msg => 
        msg.username.toLowerCase().includes($filters.username.toLowerCase())
      ) : picked;
  }
);