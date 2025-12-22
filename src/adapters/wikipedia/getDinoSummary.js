import { Dino } from '../../domain/Dino.js'

export async function getDinoSummary(dinoName) {
    const encodedDinoName = encodeURIComponent(dinoName);
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodedDinoName}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Dinossauro não encontrado")
    }

    const data = await response.json();

    // Página ambígua (disambiguation) não representa um dinossauro específico
    if (data.type === "disambiguation") {
        throw new Error("Página ambígua, não é um dinossauro válido");
    }

    return new Dino({
        name: data.title.trim(),
        description: data.extract,
        image: data.thumbnail?.source || null,
        source: "Wikipedia"
    })
}