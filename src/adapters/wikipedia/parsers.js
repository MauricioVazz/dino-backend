export function extractScientificName(text) {
    if (!text) return null;
    const match = text.match(/\(([^)]+)\)/);
    return match ? match[1] : null;
}

export function extractPeriod(text) {
    if (!text) return null;
    if (text.includes('Cretáceo')) {
        return {
            era: 'Mesozoica',
            period: 'Cretáceo',
            yearsAgo: '145–66 milhões de anos'
        };
    }
    return null;
}

export function extractDiet(text) {
    if (!text) return null;
    if (text.match(/carnívoro/i)) {
        return { type: 'Carnívoro', details: null };
    }
    if (text.match(/herbívoro/i)) {
        return { type: 'Herbívoro', details: null };
    }
    return null;
}

export function extractHabitat(text) {
    if (!text) return null;
    if (text.includes('América do Norte')) {
        return {
            regions: ['América do Norte'],
            environment: null
        };
    }
    return null;
}

export function extractDiscovery(text) {
    return null; // evoluir depois
}

export function extractCuriosities(text) {
    if (!text) return [];
    return text
        .split('.')
        .slice(0, 3)
        .map(t => t.trim())
        .filter(Boolean);
}
