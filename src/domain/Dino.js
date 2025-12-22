export class Dino {
  constructor({ name, description, image, source }) {
    if (!name) {
      throw new Error("O nome do dinossauro é obrigatório");
    }

    this.name = name;
    this.description = description || "";
    this.image = image || null;
    this.source = source || "Desconhecida";

    Object.freeze(this); // domínio imutável
  }
}
