import { dinoCatalog } from '../../data/dinoCatalog.js';

export function getDinoCatalog({ page = 1, limit = 12, category }) {
    let dinos = [];

    if (category && dinoCatalog[category]) {
        dinos = dinoCatalog[category];
    } else {
        dinos = Object.values(dinoCatalog).flat();
    }

    const total = dinos.length;
    const totalPages = Math.ceil(total / limit);

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
        data: dinos.slice(start, end),
        meta: {
            page,
            limit,
            total,
            totalPages
        }
    };
}
