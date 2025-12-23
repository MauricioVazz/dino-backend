import { favoriteDinoService } from '../../services/dino/favoriteDinoService.js';

export async function removeFavoriteController(req, res) {
    try {
        const userId = req.user.sub;
        const { dinoName } = req.params;

        await favoriteDinoService.removeFavorite(userId, dinoName);

        return res.status(200).json({
            message: 'Favorito removido com sucesso'
        });

    } catch (error) {

        if (error.details) {
            return res.status(400).json({
                message: error.message,
                errors: error.details
            });
        }

        if (error.code === 'NOT_FOUND') {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            message: 'Erro interno do servidor'
        });
    }
}
