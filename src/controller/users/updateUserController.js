import { updateUser } from "../../model/userModel.js";

export const updateUserController = async (req, res) => {
    try {
        const param = req.params.id;

        const identifier = isNaN(param) ? param : parseInt(param);

        const user = await updateUser(identifier, req.body);

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        // Captura erro do identificador inválido
        if (error.message === 'Identificador inválido') {
            return res.status(400).json({
                success: false,
                message: 'Identificador inválido',
            });
        }

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

        // Registro não encontrado
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
        }


        // Erro inesperado
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
}