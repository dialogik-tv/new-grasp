import type { Message } from '../types';
import type { FilterSettings } from '../stores/filterStore';

export function filterMessages(messages: Message[], filters: FilterSettings): Message[] {
  // Get active filters (excluding username field)
  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => key !== 'username' && value === true)
    .map(([key]) => key);

  // If no filters are active, return empty array
  if (activeFilters.length === 0) {
    return [];
  }

  return messages.filter(msg => {
    // Check if message matches any of the active filters
    const matchesFilter = activeFilters.some(filter => {
      switch (filter) {
        case 'chatcount':
          return msg.grasp.chatcount === 1 || msg.grasp.chatcount === 2;
        case 'mention':
          return msg.grasp.mention;
        case 'mod':
          return msg.grasp.mod;
        case 'sub':
          return msg.grasp.sub && !msg.grasp.mod;
        case 'vip':
          return msg.grasp.vip && !msg.grasp.mod && !msg.grasp.sub;
        case 'haystack':
          return msg.grasp.haystack;
        case 'shorty':
          return msg.grasp.shorty;
        default:
          return false;
      }
    });

    // Apply username filter if present
    const matchesUsername = !filters.username || 
      msg.username.toLowerCase().includes(filters.username.toLowerCase());

    return matchesFilter && matchesUsername;
  });
}