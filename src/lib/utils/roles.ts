export interface UserRole {
  type: 'mod' | 'sub' | 'vip';
  color: string;
  priority: number;
}

const ROLE_CONFIG: Record<UserRole['type'], Omit<UserRole, 'type'>> = {
  mod: { color: 'purple', priority: 1 },
  vip: { color: '#00ff00', priority: 2 },
  sub: { color: 'white', priority: 3 }
};

export function getUserRoles(badges: Record<string, string>): UserRole[] {
  const roles: UserRole[] = [];
  
  if (badges?.moderator === '1') {
    roles.push({ type: 'mod', ...ROLE_CONFIG.mod });
  }
  if (badges?.vip) {
    roles.push({ type: 'vip', ...ROLE_CONFIG.vip });
  }
  if (badges?.subscriber) {
    roles.push({ type: 'sub', ...ROLE_CONFIG.sub });
  }
  
  // Sort roles by priority
  return roles.sort((a, b) => a.priority - b.priority);
}