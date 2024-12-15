import { derived } from 'svelte/store';
import { messages } from './messages/messageStore';
import type { Message } from '../types';

export const messageStats = derived(messages, ($messages) => {
  const stats = {
    totalMessages: $messages.length,
    uniqueUsers: new Set($messages.map(m => m.username)).size,
    messageTypes: {
      mentions: $messages.filter(m => m.grasp.mention).length,
      firstTime: $messages.filter(m => m.grasp.chatcount === 1).length,
      modMessages: $messages.filter(m => m.grasp.mod).length,
      subMessages: $messages.filter(m => m.grasp.sub).length,
      vipMessages: $messages.filter(m => m.grasp.vip).length,
      shorties: $messages.filter(m => m.grasp.shorty).length
    },
    topChatters: getTopChatters($messages),
    messagesByMinute: getMessagesByMinute($messages)
  };

  return stats;
});

function getTopChatters(messages: Message[]) {
  const userCounts = messages.reduce((acc, msg) => {
    acc[msg.username] = (acc[msg.username] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(userCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
}

function getMessagesByMinute(messages: Message[]) {
  const timeGroups = messages.reduce((acc, msg) => {
    const minute = Math.floor(msg.timestamp.getTime() / 60000) * 60000;
    acc[minute] = (acc[minute] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return Object.entries(timeGroups)
    .map(([time, count]) => ({
      time: parseInt(time),
      count
    }))
    .sort((a, b) => a.time - b.time);
}