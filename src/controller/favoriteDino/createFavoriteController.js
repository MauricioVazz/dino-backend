import { favoriteDinoService } from '../../services/dino/favoriteDinoService.js';

export async function createFavoriteController(req, res) {
    try {
        // publicId do usuário autenticado
        const userId = req.user.sub;

        const { dinoName } = req.body;

        const favorite = await favoriteDinoService.addFavorite(userId, dinoName);

        return res.status(201).json({
            message: 'Dinossauro favoritado com sucesso',
            favorite
        });

    } catch (error) {

        // Erro de validação (Zod)
        if (error.details) {
            return res.status(400).json({
                message: error.message,
                errors: error.details
            });
        }

        // Dino não encontrado na API externa
        if (error.message.includes('não encontrado') || error.message.includes('ambígua')) {
            return res.status(404).json({
                message: error.message
            });
        }

        // Já favoritado
        if (error.code === 'ALREADY_EXISTS') {
            return res.status(409).json({
                message: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            message: 'Erro interno do servidor'
        });
    }
}