import express from 'express';
import { getDinoDetailsController } from '../controller/dino/getDinoDetailsController.js';
import { listDinosController } from '../controller/dino/listDinosController.js';
import { getDinoCatalogController } from '../controller/dino/getDinoCatalogController.js';

const router = express.Router();

// Rota para listar dinossauros
router.get('/', listDinosController);

// Rota para obter catálogo de dinossauros
router.get('/catalog', getDinoCatalogController);

// Rota para obter detalhes do dinossauro
router.get('/:name', getDinoDetailsController);

export default router;
