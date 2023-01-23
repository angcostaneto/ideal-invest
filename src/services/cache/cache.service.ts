import Keyv from 'keyv';

// Configure connection with redis.
const cache = new Keyv(
	`redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
);

/**
 * Set cache on redis
 *
 * @param key string
 * @param value string
 * @param ttl number
 * @returns
 */
export const cacheSet = (key: string, value: string, ttl: number = 0) => {
	return cache.set(key, value, ttl);
};

/**
 * Get cache by name
 *
 * @param key string
 * @returns
 */
export const cacheGet = (key: string) => {
	return cache.get(key);
};

/**
 * Delete cache by name
 *
 * @param key string
 * @returns
 */
export const cacheDelete = (key: string) => {
	return cache.delete(key);
};
