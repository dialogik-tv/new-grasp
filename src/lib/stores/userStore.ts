import { writable } from 'svelte/store';
import type { User } from '../types';

export const users = writable<Record<string, User>>({});

export function updateUser(user: User) {
  users.update(state => {
    const existingUser = state[user.userId];
    return {
      ...state,
      [user.userId]: {
        ...user,
        chatcount: existingUser ? existingUser.chatcount + 1 : 1
      }
    };
  });
}

export function getUser(userId: string) {
  let result: User | undefined;
  users.subscribe(state => {
    result = state[userId];
  })();
  return result;
}