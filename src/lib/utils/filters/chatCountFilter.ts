import type { Message } from '../../types';

export function chatCountFilter(message: Message): boolean {
  return message.grasp.chatcount === 1 || message.grasp.chatcount === 2;
}