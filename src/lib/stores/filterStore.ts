import { writable } from 'svelte/store';

export interface FilterSettings {
  username: string;
  chatcount: boolean;
  mod: boolean;
  sub: boolean;
  vip: boolean;
  haystack: boolean;
  shorty: boolean;
  mention: boolean;
}

const defaultSettings: FilterSettings = {
  username: '',
  chatcount: true,  // Default ON
  mention: true,    // Default ON
  mod: false,
  sub: false,
  vip: false,
  haystack: true,   // Default ON
  shorty: true      // Default ON
};

function createFilterStore() {
  const { subscribe, set, update } = writable<FilterSettings>(defaultSettings);

  return {
    subscribe,
    set,
    update,
    reset: () => set(defaultSettings),
    toggle: (key: keyof Omit<FilterSettings, 'username'>) => 
      update(settings => ({
        ...settings,
        [key]: !settings[key]
      }))
  };
}

export const filterSettings = createFilterStore();