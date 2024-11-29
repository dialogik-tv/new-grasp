import type { Message } from '../types';
import type { FilterSettings } from '../stores/filterStore';

export function filterMessages(messages: Message[], filters: FilterSettings): Message[] {
  return messages.filter(msg => {
    const f = filters;
    return (
      (f.mention && msg.grasp.mention) ||
      (f.mod && msg.grasp.mod) ||
      (f.sub && msg.grasp.sub) ||
      (f.vip && msg.grasp.vip) ||
      (f.chatcount && msg.grasp.chatcount !== false) ||
      (f.haystack && msg.grasp.haystack) ||
      (f.shorty && msg.grasp.shorty) ||
      msg.grasp.redemption
    ) && (!f.username || msg.username.toLowerCase().includes(f.username.toLowerCase()));
  });
}