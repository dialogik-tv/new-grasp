import { writable, derived } from 'svelte/store';
import type { Message } from '../types';

// Create the main message store
export const messages = writable<Message[]>([]);

// Create derived stores for filtered messages
export const chatMessages = derived(messages, $messages => 
  $messages.slice(0, 100)
);

export const graspMessages = derived(messages, $messages => 
  $messages.filter(msg => 
    msg.grasp.mention || 
    msg.grasp.chatcount !== false || 
    msg.grasp.mod || 
    msg.grasp.sub || 
    msg.grasp.vip || 
    msg.grasp.haystack || 
    msg.grasp.shorty || 
    msg.grasp.redemption
  )
);

export const pickedMessages = derived(messages, $messages => 
  $messages.filter(msg => msg.pick)
);

// Message actions
export function addMessage(message: Message) {
  messages.update(msgs => {
    // Add new message at the beginning
    msgs = [message, ...msgs];
    
    // Keep only the last 100 messages
    if (msgs.length > 100) {
      msgs = msgs.slice(0, 100);
    }
    
    return msgs;
  });
}

export function toggleRead(messageId: string) {
  messages.update(msgs => 
    msgs.map(msg => 
      msg.id === messageId ? { ...msg, read: !msg.read } : msg
    )
  );
}

export function togglePick(messageId: string) {
  messages.update(msgs => 
    msgs.map(msg => 
      msg.id === messageId ? { ...msg, pick: !msg.pick } : msg
    )
  );
}