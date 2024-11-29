import { filterSettings } from '../stores/filterStore';
import { get } from 'svelte/store';
import type { FilterSettings } from '../stores/filterStore';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  description: string;
  action: () => void;
}

export function matchesShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
  return event.key.toLowerCase() === shortcut.key.toLowerCase() &&
    !!event.ctrlKey === !!shortcut.ctrl &&
    !!event.altKey === !!shortcut.alt &&
    !!event.shiftKey === !!shortcut.shift;
}

export function createShortcuts(filters: typeof filterSettings) {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'M',
      ctrl: true,
      description: 'Toggle mods',
      action: () => filters.update(f => ({ ...f, mod: !f.mod }))
    },
    {
      key: 'S',
      ctrl: true,
      description: 'Toggle subs',
      action: () => filters.update(f => ({ ...f, sub: !f.sub }))
    },
    {
      key: 'V',
      ctrl: true,
      description: 'Toggle VIPs',
      action: () => filters.update(f => ({ ...f, vip: !f.vip }))
    },
    {
      key: 'm',
      description: 'Toggle @mentions',
      action: () => filters.update(f => ({ ...f, mention: !f.mention }))
    },
    {
      key: 'H',
      ctrl: true,
      description: 'Toggle haystack needles',
      action: () => filters.update(f => ({ ...f, haystack: !f.haystack }))
    },
    {
      key: 'h',
      description: 'Toggle shorties',
      action: () => filters.update(f => ({ ...f, shorty: !f.shorty }))
    },
    {
      key: 'x',
      description: 'Remove all filters',
      action: () => filters.update(f => ({
        ...f,
        username: '',
        chatcount: false,
        mention: false,
        mod: false,
        sub: false,
        vip: false,
        haystack: false,
        shorty: false
      }))
    },
    {
      key: 'x',
      alt: true,
      description: 'Set default filters',
      action: () => filters.update(f => ({
        ...f,
        chatcount: true,
        mention: true,
        haystack: true,
        shorty: true,
        mod: false,
        sub: false,
        vip: false
      }))
    },
    {
      key: 'X',
      shift: true,
      description: 'Activate all filters',
      action: () => filters.update(f => ({
        ...f,
        chatcount: true,
        mention: true,
        mod: true,
        sub: true,
        vip: true,
        haystack: true,
        shorty: true
      }))
    }
  ];

  return shortcuts;
}

export function initializeKeyboardShortcuts() {
  const shortcuts = createShortcuts(filterSettings);

  window.addEventListener('keyup', (event) => {
    // Don't handle shortcuts when typing in input fields
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    if (event.defaultPrevented) return;

    for (const shortcut of shortcuts) {
      if (matchesShortcut(event, shortcut)) {
        event.preventDefault();
        shortcut.action();
        break;
      }
    }
  });
}