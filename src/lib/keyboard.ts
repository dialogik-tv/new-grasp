import { filterSettings } from './messageStore';
import { get } from 'svelte/store';

export function initializeKeyboardShortcuts() {
  window.addEventListener('keyup', (event) => {
    if (event.defaultPrevented) return;

    const filters = get(filterSettings);
    
    switch (event.key) {
      case 'x':
        if (!event.altKey) {
          // [X] - Remove all filters
          filterSettings.update(f => ({
            ...f,
            username: '',
            chatcount: false,
            mention: false,
            mod: false,
            sub: false,
            vip: false,
            haystack: false,
            shorty: false
          }));
        } else {
          // [Alt+X] – Set default filters
          filterSettings.update(f => ({
            ...f,
            chatcount: true,
            mention: true,
            haystack: true,
            shorty: true,
            mod: false,
            sub: false,
            vip: false
          }));
        }
        break;
      case 'X':
        // [Shift+X] - Activate all filters
        filterSettings.update(f => ({
          ...f,
          chatcount: true,
          mention: true,
          mod: true,
          sub: true,
          vip: true,
          haystack: true,
          shorty: true
        }));
        break;
      case 'M':
        // [Shift+M] - Toggle mods
        filterSettings.update(f => ({ ...f, mod: !f.mod }));
        break;
      case 'm':
        // [m] - Toggle mentions
        filterSettings.update(f => ({ ...f, mention: !f.mention }));
        break;
      case 'S':
        // [Shift+S] - Toggle subs
        filterSettings.update(f => ({ ...f, sub: !f.sub }));
        break;
      case 'V':
        // [Shift+V] - Toggle VIPs
        filterSettings.update(f => ({ ...f, vip: !f.vip }));
        break;
      case 'H':
        // [Shift+H] - Toggle haystack
        filterSettings.update(f => ({ ...f, haystack: !f.haystack }));
        break;
      case 'h':
        // [h] - Toggle shorties
        filterSettings.update(f => ({ ...f, shorty: !f.shorty }));
        break;
    }
  });
}