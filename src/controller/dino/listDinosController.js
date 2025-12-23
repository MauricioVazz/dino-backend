import { listDinosService } from '../../services/dino/listDinosService.js';

export async function listDinosController(req, res) {
    try {
        const { page, limit } = req.query;

        const data = await listDinosService(page, limit);

        return res.json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro ao listar dinossauros'
        });
    }
}
