// Message related types
export interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  badges: Badges;
  emotes: any[];
  read: boolean;
  pick: boolean;
  grasp: GraspResult;
}

export interface Badges {
  moderator?: boolean;
  subscriber?: boolean;
  vip?: boolean;
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

// User related types
export interface User {
  userId: string;
  username: string;
  badges: Badges;
  chatcount: number;
}

// Filter related types
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