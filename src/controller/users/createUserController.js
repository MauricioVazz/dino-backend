import { createUser } from '../../model/userModel.js';

export const createUserController = async (req, res) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).json({ success: true, data: user });
    } catch (error) {
        // Erro de validação zod
        if (error.details) {
            return res.status(400).json({
                success: false,
                message: 'Erro de validação',
                errors: error.details,
            });
        }

        // Conflito de email (unique constraint do Prisma)
        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: 'Email já está em uso',
            });
        }

        // Erro inesperado
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
};