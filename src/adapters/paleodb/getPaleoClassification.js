export async function getPaleoClassification(dinoName) {
    try {
        const encodedName = encodeURIComponent(dinoName.toLowerCase());

        // Busca por nome
        const url = `https://paleobiodb.org/data1.2/taxa/list.json?name=${encodedName}&rel=all_children`;

        const response = await fetch(url);
        if (!response.ok) return null;

        const data = await response.json();
        if (!data.records || data.records.length === 0) return null;

        const record = data.records[0];

        return {
            scientificName: record.nam || null,
            era: record.era || null,
            period: record.early_interval || record.late_interval || null,
            order: record.ord || null,
            family: record.fam || null
        };

    } catch (error) {
        console.warn('[PaleoDB] Falha ao buscar dados:', error.message);
        return null;
    }
}
