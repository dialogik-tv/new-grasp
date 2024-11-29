export interface UserRole {
  type: 'mod' | 'sub' | 'vip';
  color: string;
}

export function getUserRoles(badges: Record<string, string>): UserRole[] {
  const roles: UserRole[] = [];
  
  if (badges?.moderator === '1') {
    roles.push({ type: 'mod', color: 'purple' });
  }
  if (badges?.subscriber) {
    roles.push({ type: 'sub', color: 'white' });
  }
  if (badges?.vip) {
    roles.push({ type: 'vip', color: '#00ff00' });
  }
  
  return roles;
}