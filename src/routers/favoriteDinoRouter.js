import express from 'express';
import { createFavoriteController } from '../controller/favoriteDino/createFavoriteController.js';
import { listFavoritesController } from '../controller/favoriteDino/listFavoriteController.js';
import { removeFavoriteController } from '../controller/favoriteDino/removeFavoriteController.js';

// Middleware
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rota para criar favorito
router.post('/', authMiddleware, createFavoriteController);
router.get('/', authMiddleware, listFavoritesController);
router.delete('/:dinoName', authMiddleware, removeFavoriteController);

export default router;