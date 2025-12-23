import { dinoCatalog } from '../../catalog/dinoCatalog.js';
import { getDinoSummary } from '../../adapters/wikipedia/getDinoSummary.js';
import { getFromCache, saveToCache } from '../../cache/dinoCache.js';

const MAX_LIMIT = 20;

export async function listDinosService(page = 1, limit = 12) {

    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.min(Number(limit) || 12, MAX_LIMIT);

    const start = (safePage - 1) * safeLimit;
    const end = start + safeLimit;

    const slice = dinoCatalog.slice(start, end);

    const results = await Promise.all(
        slice.map(async (name) => {
            const cacheKey = `card:${name}`;
            const cached = getFromCache(cacheKey);

            if (cached) return cached;

            const dino = await getDinoSummary(name);

            const card = {
                name: dino.name,
                shortDescription: dino.description?.split('.').shift() || null,
                image: dino.image
                    ? { url: dino.image, alt: `Imagem de ${dino.name}` }
                    : null
            };

            saveToCache(cacheKey, card);
            return card;
        })
    );

    return {
        page: safePage,
        limit: safeLimit,
        total: dinoCatalog.length,
        hasNext: end < dinoCatalog.length,
        hasPrev: safePage > 1,
        results
    };
}
