import type { Message } from '../../types';

export function modFilter(message: Message): boolean {
  return message.grasp.mod;
}

export function subFilter(message: Message): boolean {
  return message.grasp.sub;
}

export function vipFilter(message: Message): boolean {
  return message.grasp.vip;
}