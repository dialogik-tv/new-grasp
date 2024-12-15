import type { Message } from '../../types';

export class MessageIndex {
  private indexByUsername: Map<string, Set<string>> = new Map();
  private indexByTimestamp: Map<number, Set<string>> = new Map();

  add(message: Message): void {
    // Index by username
    const usernameKey = message.username.toLowerCase();
    if (!this.indexByUsername.has(usernameKey)) {
      this.indexByUsername.set(usernameKey, new Set());
    }
    this.indexByUsername.get(usernameKey)!.add(message.id);

    // Index by minute timestamp (for efficient age-based cleanup)
    const timeKey = Math.floor(message.timestamp.getTime() / 60000);
    if (!this.indexByTimestamp.has(timeKey)) {
      this.indexByTimestamp.set(timeKey, new Set());
    }
    this.indexByTimestamp.get(timeKey)!.add(message.id);
  }

  remove(message: Message): void {
    const usernameKey = message.username.toLowerCase();
    const timeKey = Math.floor(message.timestamp.getTime() / 60000);

    this.indexByUsername.get(usernameKey)?.delete(message.id);
    this.indexByTimestamp.get(timeKey)?.delete(message.id);
  }

  getMessageIdsByUsername(username: string): Set<string> {
    return this.indexByUsername.get(username.toLowerCase()) || new Set();
  }

  getMessageIdsOlderThan(timestamp: number): string[] {
    const timeKey = Math.floor(timestamp / 60000);
    const oldMessageIds: string[] = [];

    for (const [key, ids] of this.indexByTimestamp.entries()) {
      if (key < timeKey) {
        ids.forEach(id => oldMessageIds.push(id));
      }
    }

    return oldMessageIds;
  }

  clear(): void {
    this.indexByUsername.clear();
    this.indexByTimestamp.clear();
  }
}