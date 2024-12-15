import type { Message } from '../../types';
import { BUFFER_CONFIG } from './bufferConfig';
import { MessageIndex } from './messageIndex';

export class MessageBuffer {
  private messages: Map<string, Message> = new Map();
  private messageOrder: string[] = [];
  private index: MessageIndex = new MessageIndex();
  private pendingBatch: Message[] = [];
  private batchTimeout: NodeJS.Timeout | null = null;

  add(message: Message): void {
    this.pendingBatch.push(message);
    
    if (this.pendingBatch.length >= BUFFER_CONFIG.BATCH_SIZE) {
      this.flushBatch();
    } else if (!this.batchTimeout) {
      // Flush batch after a short delay if not reaching batch size
      this.batchTimeout = setTimeout(() => this.flushBatch(), 100);
    }
  }

  private flushBatch(): void {
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }

    for (const message of this.pendingBatch) {
      this.addMessage(message);
    }
    
    this.pendingBatch = [];
    this.pruneIfNeeded();
  }

  private addMessage(message: Message): void {
    this.messages.set(message.id, message);
    this.messageOrder.unshift(message.id);
    this.index.add(message);
  }

  private pruneIfNeeded(): void {
    // Prune by size
    if (this.messageOrder.length > BUFFER_CONFIG.MAX_MESSAGES) {
      const toRemove = this.messageOrder.splice(BUFFER_CONFIG.PRUNE_THRESHOLD);
      for (const id of toRemove) {
        const message = this.messages.get(id);
        if (message) {
          this.index.remove(message);
          this.messages.delete(id);
        }
      }
    }

    // Prune by age
    const cutoffTime = Date.now() - BUFFER_CONFIG.MAX_AGE_MS;
    const oldMessageIds = this.index.getMessageIdsOlderThan(cutoffTime);
    
    for (const id of oldMessageIds) {
      const message = this.messages.get(id);
      if (message) {
        this.index.remove(message);
        this.messages.delete(id);
        const orderIndex = this.messageOrder.indexOf(id);
        if (orderIndex !== -1) {
          this.messageOrder.splice(orderIndex, 1);
        }
      }
    }
  }

  getMessages(): Message[] {
    this.flushBatch(); // Ensure pending messages are processed
    return this.messageOrder
      .slice(0, BUFFER_CONFIG.MAX_MESSAGES)
      .map(id => this.messages.get(id)!)
      .filter(Boolean);
  }

  getMessagesByUsername(username: string): Message[] {
    const messageIds = this.index.getMessageIdsByUsername(username);
    return Array.from(messageIds)
      .map(id => this.messages.get(id))
      .filter((msg): msg is Message => msg !== undefined);
  }

  clear(): void {
    this.messages.clear();
    this.messageOrder = [];
    this.index.clear();
    this.pendingBatch = [];
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }
  }
}