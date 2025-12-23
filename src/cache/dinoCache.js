const cache = new Map();

// 6 horas
const TTL = 1000 * 60 * 60 * 6;

export function getFromCache(key) {
  const entry = cache.get(key);

  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function saveToCache(key, data) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + TTL
  });
}
