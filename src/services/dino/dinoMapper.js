import {
    extractScientificName,
    extractPeriod,
    extractEra,
    extractDiet,
    extractLocomotion,
    extractSize,
    extractWeight
} from './dinoExtractors.js';

export function mapDinoData({ wiki, api }) {
    const description = wiki?.description || '';

    const sizeFromText = extractSize(description);

    return {
        name: wiki?.name || api?.name,
        scientificName:
            api?.scientific_name ||
            extractScientificName(description),

        classification: {
            era:
                api?.era ||
                extractEra(description),

            period:
                api?.period ||
                extractPeriod(description)
        },

        characteristics: {
            diet:
                api?.diet ||
                extractDiet(description),

            locomotion:
                api?.locomotion ||
                extractLocomotion(description),

            lengthMeters:
                api?.length_meters ||
                sizeFromText?.length ||
                null,

            weightKg:
                api?.weight_kg ||
                extractWeight(description)
        },

        habitat: api?.habitat || null,
        behavior: api?.behavior || null,

        description,

        image: wiki?.image
            ? { url: wiki.image, alt: `Imagem de ${wiki.name}` }
            : null,

        sources: {
            wikipedia: wiki?.source,
            api: api?.source
        }
    };
}
