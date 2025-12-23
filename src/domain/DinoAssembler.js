import { Dino } from './Dino.js';

export function assembleDino(wikiDino, paleoData) {
    return new Dino({
        name: wikiDino.name,
        description: wikiDino.description,
        image: wikiDino.image,
        source: paleoData ? ['Wikipedia', 'PaleoDB'] : ['Wikipedia'],

        scientificName: paleoData?.scientificName ?? null,

        classification: {
            era: paleoData?.era ?? wikiDino.classification?.era ?? null,
            period: paleoData?.period ?? wikiDino.classification?.period ?? null,
            order: paleoData?.order ?? null,
            family: paleoData?.family ?? null
        },

        characteristics: wikiDino.characteristics ?? null,
        habitat: wikiDino.habitat ?? null,
        behavior: wikiDino.behavior ?? null
    });
}
