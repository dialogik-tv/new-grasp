export function removeDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function sanitizeMessage(message: string): string {
  // Remove HTML tags and trim
  message = message.replace(/(<([^>]+)>)/ig, '').trim();
  
  // Return placeholder if empty
  if (message.length < 1) {
    return '<empty message>';
  }
  
  return message;
}