import express from "express"
import { loginUserController } from "../controller/auth/loginUserController.js"
import { getMeController } from "../controller/auth/getMeController.js"

// Middleware de autenticação
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Post - login com token
router.post('/login', loginUserController)
// Get me - rota protegida middleware de autenticação
router.get('/me', authMiddleware, getMeController)

export default router;