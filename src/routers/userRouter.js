import express from "express";
import { createUserController } from "../controller/users/createUserController.js";
import { getUserController } from "../controller/users/getUserController.js";
import { getAllUserController } from "../controller/users/getAllUserController.js";
import { updateUserController } from "../controller/users/updateUserController.js";
import { deleteUserController } from "../controller/users/deleteUserController.js";

// middleware
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para criar usuário
router.post('/', createUserController);
// Rota para obter usuário por ID ou email
router.get('/:id', authMiddleware, getUserController);
// Rota para obter todos os usuários
router.get('/', authMiddleware, getAllUserController);
// Rota para atualizar usuário por ID ou PublicId
router.patch('/:id', authMiddleware, updateUserController);
// Rota para deletar usuário por ID ou PublicId
router.delete('/:id', authMiddleware, deleteUserController);

export default router;