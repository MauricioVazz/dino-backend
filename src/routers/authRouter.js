import express from "express"
import { loginUserController } from "../controller/auth/loginUserController.js"

const router = express.Router();

router.post('/', loginUserController)

export default router;