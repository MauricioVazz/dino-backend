import { DinoDetails } from '../../domain/DinoDetails.js';
import {
    extractScientificName,
    extractPeriod,
    extractDiet,
    extractHabitat,
    extractDiscovery,
    extractCuriosities
} from './parsers.js';

export async function getDinoDetails(dinoName) {
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(dinoName)}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Dinossauro não encontrado');

    const data = await response.json();

    if (data.type === 'disambiguation') {
        throw new Error('Página ambígua, não é um dinossauro válido');
    }

    return new DinoDetails({
        name: data.title,
        scientificName: extractScientificName(data.extract),
        shortDescription: data.description,
        description: data.extract,
        images: {
            cover: data.thumbnail?.source || null,
            gallery: []
        },
        taxonomy: {
            kingdom: 'Animalia',
            phylum: 'Chordata',
            class: 'Reptilia'
        },
        period: extractPeriod(data.extract),
        timeline: extractPeriod(data.extract),
        physicalCharacteristics: {},
        diet: extractDiet(data.extract),
        behavior: {},
        habitat: extractHabitat(data.extract),
        discovery: extractDiscovery(data.extract),
        curiosities: extractCuriosities(data.extract),
        externalLinks: {
            wikipedia: data.content_urls?.desktop?.page || null
        },
        source: 'Wikipedia',
        lastUpdated: data.timestamp
    });
}
