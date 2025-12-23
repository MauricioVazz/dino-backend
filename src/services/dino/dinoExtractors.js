export function extractScientificName(text = '') {
    const match = text.match(/\(([^()]+idae|[^()]+saurus[^()]*)\)/i);
    return match ? match[1] : null;
}

export function extractEra(text = '') {
    if (/mesozoic|mesozoico/i.test(text)) return 'Mesozoica';
    return null;
}

export function extractPeriod(text = '') {
    if (/cretaceous|cretáceo/i.test(text)) return 'Cretáceo';
    if (/jurassic|jurássico/i.test(text)) return 'Jurássico';
    if (/triassic|triássico/i.test(text)) return 'Triássico';
    return null;
}

export function extractDiet(text = '') {
    if (/carnivore|carnívoro/i.test(text)) return 'Carnívoro';
    if (/herbivore|herbívoro/i.test(text)) return 'Herbívoro';
    if (/omnivore|onívoro/i.test(text)) return 'Onívoro';
    return null;
}

export function extractLocomotion(text = '') {
    if (/bipedal|bípede/i.test(text)) return 'Bípede';
    if (/quadrupedal|quadrúpede/i.test(text)) return 'Quadrúpede';
    return null;
}

export function extractSize(text = '') {
    const lengthMatch = text.match(/(\d+([.,]\d+)?)\s?(m|metros)/i);
    return lengthMatch
        ? { length: Number(lengthMatch[1].replace(',', '.')) }
        : null;
}

export function extractWeight(text = '') {
    const match = text.match(/(\d+([.,]\d+)?)\s?(kg|quilogramas)/i);
    return match
        ? Number(match[1].replace(',', '.'))
        : null;
}
