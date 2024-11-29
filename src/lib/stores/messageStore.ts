import { writable, derived } from 'svelte/store';
import type { Message } from '../types';

const MAX_MESSAGES = 100;
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const messages = writable<Message[]>([]);

export function addMessage(message: Message) {
  messages.update(msgs => {
    msgs.unshift(message);
    return msgs.slice(0, MAX_MESSAGES);
  });
}

// Cleanup old messages periodically
setInterval(() => {
  messages.update(msgs => {
    const now = Date.now();
    return msgs.filter(msg => now - msg.timestamp.getTime() < CLEANUP_INTERVAL);
  });
}, CLEANUP_INTERVAL);

// Derived store for picked messages
export const pickedMessages = derived(messages, $messages => 
  $messages.filter(msg => msg.pick)
);