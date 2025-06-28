import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL
});
redis.on('error', (err) => console.error('Redis error:', err));

export async function withCache<T>(cb: () => T, key: string) {
  if (!redis.isOpen) {
    await redis.connect();
  }
  const cached = await redis.get(key);
  if (cached !== null) {
    return JSON.parse(cached) as T;
  }
  const result = await cb();
  redis.set(key, JSON.stringify(result), { EX: 5 * 60 });
  return result;
}
