import { loginUser } from "../../model/authModel.js";
import { generateToken } from "../../utils/tokenGenerate.js";

export const loginUserController = async (req, res) => {
    try {
        const user = await loginUser(req.body);

        // Gerar token JWT
        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            data: {
                token,
                user,
            },
        });
    } catch (error) {
        
        // Erro de validação Zod
        if (error.details) {
            return res.status(400).json({
                success: false,
                message: 'Erro de validação',
                errors: error.details,
            });
        }

        // Credenciais inválidas
        if (error.code === 'INVALID_CREDENTIALS') {
            return res.status(401).json({
                success: false,
                message: 'Email ou senha inválidos',
            });
        }

        // Erro inesperado
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
};