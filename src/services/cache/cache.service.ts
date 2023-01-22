import Keyv from 'keyv';

const cache = new Keyv(
	`redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
);

export const cacheSet = (key: string, value: string, ttl: number = 0) => {
	return cache.set(key, value, ttl);
};

export const cacheGet = (key: string) => {
	return cache.get(key);
};

export const cacheDelete = (key: string) => {
	return cache.delete(key);
};
