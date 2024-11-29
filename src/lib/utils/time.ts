import moment from 'moment';

export function formatTimeAgo(date: Date): string {
  return moment(date).fromNow();
}