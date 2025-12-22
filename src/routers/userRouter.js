import express from "express";
import { createUserController } from "../controller/users/createUserController.js";
import { getUserController } from "../controller/users/getUserController.js";
import { getAllUserController } from "../controller/users/getAllUserController.js";
import { updateUserController } from "../controller/users/updateUserController.js";
import { deleteUserController } from "../controller/users/deleteUserController.js";
import { uploadAvatarController } from "../controller/users/uploadAvatarController.js";
import { updateUserRoleController } from "../controller/users/updateUserRoleController.js";

// middleware
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { uploadAvatar } from "../utils/uploadAvatar.js";
import { ownerOrAdminMiddleware } from "../middleware/ownerOrAdminMiddleware.js";

const router = express.Router();

// Rota para criar usuário
router.post('/', createUserController);
// Rota para fazer upload de avatar
router.post('/:id/avatar', authMiddleware, ownerOrAdminMiddleware, uploadAvatar.single('avatar'), uploadAvatarController);
// Rota para obter usuário por ID ou PublicId
router.get('/:id', authMiddleware, ownerOrAdminMiddleware, getUserController);
// Rota para obter todos os usuários
router.get('/', authMiddleware, adminMiddleware, getAllUserController);
// Rota para atualizar usuário por ID ou PublicId
router.patch('/:id', authMiddleware, ownerOrAdminMiddleware, updateUserController);
// Rota para admin atualizar role de usuário
router.patch('/:id/role', authMiddleware, adminMiddleware, updateUserRoleController);
// Rota para deletar usuário por ID ou PublicId
router.delete('/:id', authMiddleware, ownerOrAdminMiddleware, deleteUserController);

export default router;