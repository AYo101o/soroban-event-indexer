import { log, logError } from "./logger";

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 5,
  baseDelayMs = 1000
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= maxAttempts) {
        logError(`Failed after ${maxAttempts} attempts`, err);
        throw err;
      }
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      log(`Attempt ${attempt} failed, retrying in ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}