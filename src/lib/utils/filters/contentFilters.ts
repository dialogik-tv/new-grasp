import type { Message } from '../../types';

export function haystackFilter(message: Message): boolean {
  return message.grasp.haystack;
}

export function shortyFilter(message: Message): boolean {
  return message.grasp.shorty;
}