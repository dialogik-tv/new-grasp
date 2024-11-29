export interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  badges: Badges;
  emotes: TwitchEmote[];
  read: boolean;
  pick: boolean;
  grasp: GraspResult;
}

export interface TwitchEmote {
  id: string;
  start: number;
  end: number;
}

export interface Badges {
  moderator?: string;
  subscriber?: string;
  vip?: string;
  [key: string]: string | undefined;
}

export interface GraspResult {
  mention: boolean;
  chatcount: number | false;
  haystack: boolean;
  shorty: boolean;
  mod: boolean;
  sub: boolean;
  vip: boolean;
  redemption: boolean;
}

export interface User {
  userId: string;
  username: string;
  badges: Badges;
  chatcount: number;
}

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