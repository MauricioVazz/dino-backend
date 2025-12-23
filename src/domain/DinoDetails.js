export class DinoDetails {
    constructor({
        name,
        scientificName,
        description,
        shortDescription,
        images,
        taxonomy,
        period,
        timeline,
        physicalCharacteristics,
        diet,
        behavior,
        habitat,
        discovery,
        curiosities,
        externalLinks,
        source,
        lastUpdated
    }) {
        this.name = name;
        this.scientificName = scientificName;
        this.description = description;
        this.shortDescription = shortDescription;
        this.images = images;
        this.taxonomy = taxonomy;
        this.period = period;
        this.timeline = timeline;
        this.physicalCharacteristics = physicalCharacteristics;
        this.diet = diet;
        this.behavior = behavior;
        this.habitat = habitat;
        this.discovery = discovery;
        this.curiosities = curiosities;
        this.externalLinks = externalLinks;
        this.source = source;
        this.lastUpdated = lastUpdated;
    }
}
