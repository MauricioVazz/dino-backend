import * as z from 'zod';
import { getDinoSummary } from '../../adapters/wikipedia/getDinoSummary.js';
import { favoriteDinoModel } from '../../model/favoriteDinoModel.js';

// Schema de validação
const favoriteSchema = z.object({
    dinoName: z
        .string({ required_error: 'Nome do dinossauro é obrigatório' })
        .min(1)
});

export const favoriteDinoService = {

    async addFavorite(userId, dinoName) {
        // 1. Validação
        const parsed = favoriteSchema.safeParse({ dinoName });
        if (!parsed.success) {
            const err = new Error('Erro de validação');
            err.details = parsed.error.flatten().fieldErrors;
            throw err;
        }

        const normalizedName = parsed.data.dinoName.trim();

        // 2. Valida se o dinossauro existe (fonte externa)
        await getDinoSummary(normalizedName);

        // 3. Cria favorito
        return favoriteDinoModel.create(userId, normalizedName);
    },

    async listFavorites(userId) {
        const favorites = await favoriteDinoModel.findByUser(userId);

        // 4. Enriquecimento com dados externos (cards)
        return Promise.all(
            favorites.map(async (favorite) => {
                const dino = await getDinoSummary(favorite.dinoName);

                return {
                    favoriteId: favorite.publicId,
                    favoritedAt: favorite.createdAt,
                    dino
                };
            })
        );
    },

    async removeFavorite(userId, dinoName) {
        const parsed = favoriteSchema.safeParse({ dinoName });
        if (!parsed.success) {
            const err = new Error('Erro de validação');
            err.details = parsed.error.flatten().fieldErrors;
            throw err;
        }

        const normalizedName = parsed.data.dinoName.trim();

        return favoriteDinoModel.remove(userId, normalizedName);
    }
};