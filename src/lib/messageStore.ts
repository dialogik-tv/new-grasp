import { writable } from 'svelte/store';
import type { Message, User, FilterSettings } from './types';

// Message store
export const messages = writable<Message[]>([]);

// User store
export const users = writable<Record<string, User>>({});

// Filter settings store with default values
export const filterSettings = writable<FilterSettings>({
  username: '',
  mention: true,
  chatcount: true,
  mod: false,
  sub: false,
  vip: false,
  haystack: true,
  shorty: true
});

// Message actions
export const addMessage = (message: Message) => {
  messages.update(msgs => [message, ...msgs.slice(0, 99)]);
};

// User actions
export const updateUser = (user: User) => {
  users.update(users => ({
    ...users,
    [user.userId]: user
  }));
};