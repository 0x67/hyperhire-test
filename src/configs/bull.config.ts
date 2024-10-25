export const DEFAULT_BULL_OPTIONS = {
  attempts: 5,
  backoff: 3 * 1000,
  lifo: true,
  // delay: 60 * 1000, // By default, a job is delayed by 60 seconds
  removeOnComplete: true,
};
