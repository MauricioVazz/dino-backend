import { dinoService } from '../../services/dino/dinoService.js';

export async function getDinoDetailsController(req, res) {
    try {
        const { name } = req.params;

        const dino = await dinoService.getDetailedDino(name);

        return res.status(200).json(dino);

    } catch (error) {

        if (error.code === 'VALIDATION_ERROR') {
            return res.status(400).json({
                message: error.message
            });
        }

        if (
            error.message.includes('não encontrado') ||
            error.message.includes('ambígua')
        ) {
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
