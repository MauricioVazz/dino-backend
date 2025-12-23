import { getDinoCatalog } from '../../services/dino/getDinoCatalogService.js';

export async function getDinoCatalogController(req, res) {
    try {
        const { page = 1, limit = 12, category } = req.query;

        const catalog = getDinoCatalog({
            page: Number(page),
            limit: Number(limit),
            category
        });

        return res.json(catalog);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao listar dinossauros' });
    }
}
