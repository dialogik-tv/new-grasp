import { filterSettings } from '../stores/filterStore';
import { visibility } from '../stores/visibilityStore';

export function initializeKeyboardShortcuts() {
  window.addEventListener('keyup', (event) => {
    // Don't handle shortcuts when typing in input fields
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    if (event.defaultPrevented) return;

    const key = event.key.toLowerCase();

    // Filter toggles
    if (event.ctrlKey) {
      switch (key) {
        case 'm':
          filterSettings.toggle('mod');
          break;
        case 's':
          filterSettings.toggle('sub');
          break;
        case 'v':
          filterSettings.toggle('vip');
          break;
        case 'h':
          filterSettings.toggle('haystack');
          break;
      }
      return;
    }

    // Single key toggles (no modifiers)
    if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
      switch (key) {
        case 'm':
          filterSettings.toggle('mention');
          break;
        case 'h':
          filterSettings.toggle('shorty');
          break;
        case 'c':
          visibility.toggleChat();
          break;
        case 'u':
          visibility.toggleUserlist();
          break;
      }
    }
  });
}