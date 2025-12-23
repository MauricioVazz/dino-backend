import { getDinoDetails } from '../../adapters/wikipedia/getDinoFromWikipedia.js';
import { getPaleoClassification } from '../../adapters/paleodb/getPaleoClassification.js';

export const dinoService = {

    async getDetailedDino(dinoName) {

        if (!dinoName || typeof dinoName !== 'string') {
            const err = new Error('Nome do dinossauro inválido');
            err.code = 'VALIDATION_ERROR';
            throw err;
        }

        // 1. Fonte principal (Wikipedia)
        const wikiDino = await getDinoDetails(dinoName);

        // 2. Fonte complementar (PaleoDB)
        const paleoData = await getPaleoClassification(dinoName);

        // 3. Merge inteligente (fallback)
        return {
            ...wikiDino,

            scientificName:
                paleoData?.scientificName ?? wikiDino.scientificName,

            classification: {
                kingdom: wikiDino.taxonomy?.kingdom ?? 'Animalia',
                phylum: wikiDino.taxonomy?.phylum ?? 'Chordata',
                class: wikiDino.taxonomy?.class ?? 'Reptilia',
                order: paleoData?.order ?? null,
                family: paleoData?.family ?? null
            },

            period: {
                era: paleoData?.era ?? wikiDino.period?.era ?? null,
                period: paleoData?.period ?? wikiDino.period?.period ?? null
            },

            source: paleoData
                ? 'Wikipedia + PaleoDB'
                : 'Wikipedia'
        };
    }
};
