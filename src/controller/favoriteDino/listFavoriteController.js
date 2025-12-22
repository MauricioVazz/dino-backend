import { favoriteDinoService } from '../../services/favoriteDinoService.js';

export async function listFavoritesController(req, res) {
    try {
        const userId = req.user.sub;

        const favorites = await favoriteDinoService.listFavorites(userId);

        return res.status(200).json({
            favorites
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro interno do servidor'
        });
    }
}
