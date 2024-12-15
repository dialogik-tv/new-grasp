import type { Message } from '../../types';
import type { FilterSettings } from '../filterStore';

export class MessageCache {
  private cache: Map<string, Message[]> = new Map();
  private readonly maxCacheSize = 10;

  getCached(key: string): Message[] | undefined {
    return this.cache.get(key);
  }

  setCached(key: string, messages: Message[]): void {
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, messages);
  }

  generateCacheKey(filters: FilterSettings): string {
    return JSON.stringify({
      ...filters,
      timestamp: Math.floor(Date.now() / 30000) // Cache valid for 30 seconds
    });
  }

  clear(): void {
    this.cache.clear();
  }
}