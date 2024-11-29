export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
}

export function matchesShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
  return event.key === shortcut.key &&
    !!event.ctrlKey === !!shortcut.ctrl &&
    !!event.altKey === !!shortcut.alt &&
    !!event.shiftKey === !!shortcut.shift;
}