import { writable } from 'svelte/store';

export interface FilterSettings {
  username: string;
  mention: boolean;
  chatcount: boolean;
  mod: boolean;
  sub: boolean;
  vip: boolean;
  haystack: boolean;
  shorty: boolean;
}

const defaultSettings: FilterSettings = {
  username: '',
  mention: true,
  chatcount: true,
  mod: false,
  sub: false,
  vip: false,
  haystack: true,
  shorty: true
};

export const filterSettings = writable<FilterSettings>(defaultSettings);