export const BUFFER_CONFIG = {
  MAX_MESSAGES: 1000,
  PRUNE_THRESHOLD: 800,
  BATCH_SIZE: 50,
  MAX_AGE_MS: 24 * 60 * 60 * 1000 // 24 hours
} as const;